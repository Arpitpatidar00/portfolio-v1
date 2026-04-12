"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vinyl } from "../Vinyl";
import { Music2, Play, Pause } from "lucide-react";

import { MusicPlayer } from "../MusicPlayer";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export const MusicOverlay = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isPlaying, togglePlay, isInitialized, currentTrack } = useAudioPlayer();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't open the full player
    togglePlay();
  }

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-row-reverse items-center gap-4 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative group/vinyl">
          {/* The Rotating Vinyl */}
          <Vinyl
            size={90}
            isPlaying={isPlaying}
            className="sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] transition-transform duration-500 group-hover:scale-105"
          />

          {/* Main Music Icon (Visible when not hovered or playing) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[30] pointer-events-none opacity-20">
            {!isHovered && <Music2 size={16} className="text-white" />}
          </div>

          {/* Quick Controller Overlay - Visible on Vinyl hover or when paused */}
          <motion.div
            onClick={handleToggle}
            className={`absolute inset-0 z-[40] flex items-center justify-center bg-black/40 rounded-full transition-opacity duration-300 ${isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="w-8 h-8 rounded-full  backdrop-blur-xs flex items-center justify-center hover:bg-white/40 transition-colors">
              {isPlaying ? (
                <Pause size={14} className="text-white fill-current" />
              ) : (
                <Play size={14} className="text-white fill-current ml-0.5" />
              )}
            </div>
          </motion.div>
        </div>

        {/* Info Card - Slides out on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl min-w-[180px] text-right"
            >
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Now Playing</span>
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <h4 className="text-white text-sm font-heading font-bold uppercase tracking-tighter leading-none mb-1">
                {currentTrack.title}
              </h4>
              <p className="text-white/50 text-[10px] font-sans uppercase tracking-[0.1em]">
                {currentTrack.artist}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle "i" button/tag for mobile or collapsed state */}
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex flex-col gap-1 items-end"
          >
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] font-bold text-right">Creative</span>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] font-bold text-right">Aesthetic</span>
          </motion.div>
        )}
      </div>

      <MusicPlayer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
