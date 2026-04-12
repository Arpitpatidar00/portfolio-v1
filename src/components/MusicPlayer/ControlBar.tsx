"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Airplay,
  Repeat
} from "lucide-react";
import { Song } from "@/constants/music";
import Image from "next/image";

interface ControlBarProps {
  currentTrack: Song;
  isPlaying: boolean;
  progress: number;
  volume: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (val: number) => void;
  onSeek: (val: number) => void;
}

export const ControlBar = ({
  currentTrack,
  isPlaying,
  progress,
  volume,
  onTogglePlay,
  onNext,
  onPrev,
  onVolumeChange,
  onSeek
}: ControlBarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-8 sm:pb-12">
      {/* The main shell - Pill Shape */}
      <div className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-full p-2 sm:p-3 flex items-center justify-between gap-2 shadow-2xl relative">
        
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 sm:gap-4 pl-3 sm:pl-6">
          <button 
            onClick={onPrev}
            className="text-white hover:text-white transition-opacity opacity-60 hover:opacity-100"
          >
            <SkipBack size={18} fill="currentColor" className="sm:w-5 sm:h-5" />
          </button>
          
          <button 
            onClick={onTogglePlay}
            className="text-white transition-transform hover:scale-110 active:scale-95"
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" className="sm:w-6 sm:h-6" />
            ) : (
              <Play size={22} fill="currentColor" className="sm:w-6 sm:h-6" />
            )}
          </button>

          <button 
            onClick={onNext}
            className="text-white hover:text-white transition-opacity opacity-60 hover:opacity-100"
          >
            <SkipForward size={18} fill="currentColor" className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Center: Mini Player Box (Adaptive) */}
        <div className="flex-1 flex items-center gap-2 sm:gap-3 bg-black/40 rounded-full py-1 px-1 sm:pr-5 border border-white/5 mx-1 sm:mx-4 overflow-hidden min-w-[60px] sm:min-w-[200px]">
            {/* Album Thumbnail - Always show if possible, or hide on very small */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full sm:rounded-[14px] overflow-hidden shrink-0 shadow-lg">
                <Image src={currentTrack.coverImg} fill alt="Cover" className="object-cover" unoptimized />
                {!isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full animate-pulse mx-0.5" />
                        <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full animate-pulse mx-0.5" />
                    </div>
                )}
            </div>

            {/* Track Info & Progress - Collapsible on small screens */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                {/* Text & Visualizer - Hide on mobile, show on SM+ */}
                <div className="hidden sm:flex justify-between items-center mb-1">
                    <div className="truncate">
                        <h4 className="text-white text-[10px] sm:text-[11px] font-heading font-black truncate leading-none uppercase tracking-tighter">{currentTrack.title}</h4>
                        <p className="text-white/40 text-[8px] sm:text-[9px] font-mono tracking-widest truncate mt-1 uppercase">{currentTrack.artist}</p>
                    </div>
                    {/* Visualizer bars */}
                    <div className="flex gap-1 h-3 items-end opacity-60">
                        {[0.2, 0.4, 0.1, 0.3].map((delay, i) => (
                            <motion.div 
                                key={i}
                                animate={{ height: isPlaying ? ["20%", "100%", "20%"] : "20%" }}
                                transition={{ repeat: Infinity, duration: 0.6 + delay, ease: "easeInOut", delay }}
                                className="w-0.5 bg-white rounded-full" 
                            />
                        ))}
                    </div>
                </div>

                {/* Always visible Progress Bar */}
                <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    onSeek((x / rect.width) * 100);
                }}>
                    <motion.div 
                        className="absolute h-full bg-accent rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Desktop-only options */}
            <div className="hidden lg:flex gap-3 text-white/40 ml-2">
                 <button className="hover:text-white transition-colors"><span className="text-[10px] font-bold">...</span></button>
            </div>
        </div>

        {/* Right Utils */}
        <div className="flex items-center gap-2 sm:gap-5 pr-3 sm:pr-6 text-white/60">
           <Airplay size={16} className="hover:text-white cursor-pointer transition-colors sm:w-5 sm:h-5" />
           <Repeat size={16} className="hover:text-white cursor-pointer transition-colors hidden md:block" />
           <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={() => onVolumeChange(volume > 0 ? 0 : 0.8)}>
                    {volume === 0 ? <VolumeX size={16} className="sm:w-5 sm:h-5" /> : <Volume2 size={16} className="sm:w-5 sm:h-5" />}
                </button>
           </div>
        </div>

      </div>
    </div>
  );
};
