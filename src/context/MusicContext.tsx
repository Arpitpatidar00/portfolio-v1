"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SONG_LIST, Song } from "@/constants/music";

interface MusicContextType {
  currentTrack: Song;
  currentTrackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isInitialized: boolean;
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

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, _setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Audio
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!globalAudio) {
      globalAudio = new Audio(SONG_LIST[0].audioSrc);
      globalAudio.preload = "auto";
      globalAudio.muted = true;
      globalAudio.volume = 0.8;
      
      // Attempt immediate muted autoplay
      const playPromise = globalAudio.play();
      if (playPromise !== undefined) {
          playPromise.catch(() => {
              // Browser may block even muted autoplay, that's okay.
          });
      }
      
      (window as any).globalAudio = globalAudio;
    }

    const audio = globalAudio;

    const onTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % SONG_LIST.length;
      handleTrackChange(nextIndex);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Sync initial state
    setIsPlaying(!audio.paused);
    setDuration(audio.duration || 0);
    setVolume(audio.volume);
    setIsMuted(audio.muted);
    setIsInitialized(true);

    // Loader completion handler
    const handleLoaderComplete = () => {
      if (globalAudio && globalAudio.paused) {
        globalAudio.muted = true;
        globalAudio.play().catch(() => {});
      }
    };

    window.addEventListener("app-loader-complete", handleLoaderComplete);

    // Global Unmute Listener
    if (!hasSetupUnmuteListener) {
      hasSetupUnmuteListener = true;

      const handleUnmute = () => {
        if (globalAudio) {
          globalAudio.muted = false;
          setIsMuted(false);
          if (globalAudio.paused) {
            globalAudio.play().catch(() => {});
          }
        }
        cleanupUnmute();
      };

      const cleanupUnmute = () => {
        window.removeEventListener("click", handleUnmute);
        window.removeEventListener("scroll", handleUnmute);
        window.removeEventListener("keydown", handleUnmute);
        window.removeEventListener("touchstart", handleUnmute);
        window.removeEventListener("mousedown", handleUnmute);
      };

      window.addEventListener("click", handleUnmute);
      window.addEventListener("scroll", handleUnmute);
      window.addEventListener("keydown", handleUnmute);
      window.addEventListener("touchstart", handleUnmute);
      window.addEventListener("mousedown", handleUnmute);
    }

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("app-loader-complete", handleLoaderComplete);
    };
  }, [currentTrackIndex]);

  const handleTrackChange = useCallback((index: number) => {
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.src = SONG_LIST[index].audioSrc;
      _setCurrentTrackIndex(index);
      globalAudio.play().catch((err) => {
        console.log("Play blocked after track change:", err);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!globalAudio) return;
    if (isPlaying) {
      globalAudio.pause();
    } else {
      globalAudio.play().catch((err) => console.log("Play blocked:", err));
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
    if (globalAudio) {
      globalAudio.muted = muted;
      setIsMuted(muted);
    }
  };

  const seek = (val: number) => {
    if (globalAudio) {
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
    isInitialized,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume: (v: number) => {
        if (globalAudio) globalAudio.volume = v;
        setVolume(v);
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
