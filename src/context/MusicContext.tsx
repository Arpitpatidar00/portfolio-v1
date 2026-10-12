"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { SONG_LIST, Song } from "@/constants/music";

interface MusicContextType {
  currentTrack: Song;
  currentTrackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (val: number) => void;
  setMuted: (muted: boolean) => void;
  seek: (val: number) => void;
  setCurrentTrackIndex: (index: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Global instance to persist across page navigations in Next.js
let globalAudio: HTMLAudioElement | null = null;
let hasSetupUnmuteListener = false;

/**
 * Runs `callback` once the page has finished loading and the browser is idle,
 * so the ~9 MB track never competes with the page's own HTML, CSS, fonts and
 * hero images (which decide LCP).
 */
const whenPageIsIdle = (callback: () => void) => {
  const idle = () => {
    // Safari lacks requestIdleCallback; fall back to a short timeout.
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(callback, { timeout: 3000 });
    } else {
      setTimeout(callback, 1500);
    }
  };
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
};

/**
 * Events that count as "user activation", so the browser lets us unmute.
 * (scroll and touchstart don't: unmuting on them would pause playback.)
 */
const UNMUTE_EVENTS = ["click", "keydown", "touchend"] as const;

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, _setCurrentTrackIndex] = useState(0);
  const currentTrackIndexRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(true);

  const handleTrackChange = useCallback((index: number) => {
    if (!globalAudio) return;
    globalAudio.pause();
    globalAudio.src = SONG_LIST[index].audioSrc;
    currentTrackIndexRef.current = index;
    _setCurrentTrackIndex(index);
    globalAudio.play().catch(() => {});
  }, []);

  // Initialize Audio (once; the element outlives page navigations)
  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio(SONG_LIST[0].audioSrc);
      // Nothing is downloaded until playback is requested (after the intro and
      // page load, or on the visitor's first interaction).
      globalAudio.preload = "none";
      globalAudio.muted = true;
      globalAudio.volume = 0.8;
    }

    const audio = globalAudio;

    const syncState = () => {
      setIsPlaying(!audio.paused);
      setDuration(audio.duration || 0);
      setVolume(audio.volume);
      setIsMuted(audio.muted);
    };
    const onTimeUpdate = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => handleTrackChange((currentTrackIndexRef.current + 1) % SONG_LIST.length);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    // Sync with an element that may already be playing from a previous mount.
    audio.addEventListener("volumechange", syncState);
    queueMicrotask(syncState);

    // Loader completion handler
    const handleLoaderComplete = () => {
      whenPageIsIdle(() => {
        // Muted autoplay attempt; browsers may block it, that's okay.
        if (audio.paused) audio.play().catch(() => {});
      });
    };
    window.addEventListener("app-loader-complete", handleLoaderComplete);

    // Global unmute on the visitor's first real interaction
    const handleUnmute = () => {
      audio.muted = false;
      if (audio.paused) audio.play().catch(() => {});
      removeUnmuteListeners();
    };
    const removeUnmuteListeners = () => {
      UNMUTE_EVENTS.forEach((event) => window.removeEventListener(event, handleUnmute));
    };
    if (!hasSetupUnmuteListener) {
      hasSetupUnmuteListener = true;
      UNMUTE_EVENTS.forEach((event) => window.addEventListener(event, handleUnmute));
    }

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("volumechange", syncState);
      window.removeEventListener("app-loader-complete", handleLoaderComplete);
    };
  }, [handleTrackChange]);

  const togglePlay = () => {
    if (!globalAudio) return;
    if (isPlaying) {
      globalAudio.pause();
    } else {
      globalAudio.play().catch(() => {});
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % SONG_LIST.length;
    handleTrackChange(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + SONG_LIST.length) % SONG_LIST.length;
    handleTrackChange(prevIndex);
  };

  const setMuted = (muted: boolean) => {
    if (globalAudio) globalAudio.muted = muted; // "volumechange" syncs state
  };

  const seek = (val: number) => {
    if (globalAudio && Number.isFinite(globalAudio.duration)) {
      const time = (val / 100) * globalAudio.duration;
      globalAudio.currentTime = time;
      setProgress(val);
    }
  };

  const value = {
    currentTrack: SONG_LIST[currentTrackIndex],
    currentTrackIndex,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume: (v: number) => {
      if (globalAudio) globalAudio.volume = v; // "volumechange" syncs state
    },
    setMuted,
    seek,
    setCurrentTrackIndex: handleTrackChange,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
