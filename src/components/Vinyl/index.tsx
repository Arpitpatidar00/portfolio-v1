"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface VinylProps {
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export const Vinyl = ({ size = 120, className = "", isPlaying = true }: VinylProps) => {
  return (
    <div 
      className={`relative rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${className}`}
      style={{ width: size, height: size }}
    >
      {/* The Vinyl Disc itself */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        {/* Main Texture Image */}
        <Image
          src="/Stickers/vinyl.png"
          fill
          alt="Vinyl Record"
          className="object-cover"
          unoptimized
        />
        
        {/* Subtle Conic Gradient for "Grooves" effect */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.05)_90deg,transparent_180deg,rgba(255,255,255,0.05)_270deg,transparent_360deg)] opacity-40 mix-blend-overlay pointer-events-none" />
        
        {/* Center Hole Shadow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6%] h-[6%] bg-black rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] z-20" />
      </motion.div>
      
      {/* Static Inner Glow for depth */}
      <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
    </div>
  );
};
