"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SONG_LIST } from "@/constants/music";
import Image from "next/image";

interface SongCarouselProps {
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const SongCarousel = ({ currentIndex, onSelect }: SongCarouselProps) => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center perspective-[2000px] overflow-visible">
      <div className="relative w-full flex items-center justify-center h-full">
        <AnimatePresence initial={false}>
          {SONG_LIST.map((song, index) => {
            const distance = index - currentIndex;
            const absDistance = Math.abs(distance);

            if (absDistance > 2) return null;

            // Arc Logic: side cards move down and behind
            const xOffset = distance * (window.innerWidth < 640 ? 45 : 120);
            const yOffset = absDistance * (window.innerWidth < 640 ? 15 : 25);
            const scale = 1 - absDistance * 0.1;
            const rotateY = distance * -20;
            const zIndex = 50 - absDistance * 10;
            const opacity = 1 - absDistance * 0.2;

            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, scale: 0.8, x: xOffset, y: yOffset }}
                animate={{
                  opacity,
                  scale,
                  x: xOffset,
                  y: yOffset,
                  zIndex,
                  rotateY,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                onClick={() => onSelect(index)}
                className={`absolute w-[160px] h-[200px] sm:w-[220px] sm:h-[280px] md:w-[280px] md:h-[360px] rounded-[24px] md:rounded-[36px] overflow-hidden cursor-pointer shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-white/10 ${index === currentIndex ? "ring-1 ring-white/20" : ""
                  }`}
              >
                <Image
                  src={song.coverImg}
                  fill
                  alt={song.title}
                  className="object-cover"
                  unoptimized
                />

                {/* Active Card Footer Branding (matches image) */}
                {index === currentIndex && (
                  <div className="absolute inset-x-0 bottom-0 p-4 pt-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center text-center">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] mb-1">
                      Creativestyle
                    </span>
                    <h3 className="text-white text-base sm:text-lg md:text-2xl font-heading font-bold uppercase tracking-tighter leading-none">
                      {song.title}
                    </h3>
                    <p className="text-white/50 text-[10px] sm:text-xs font-sans mt-1 opacity-80">
                      {song.artist}
                    </p>
                  </div>
                )}

                {/* Shaded bottom for non-active cards */}
                {index !== currentIndex && (
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/90 to-transparent flex items-end p-3">
                    <span className="text-white opacity-40 text-[10px] font-bold uppercase truncate">{song.title}</span>
                  </div>
                )}

                {/* Depth Overlay */}
                {index !== currentIndex && (
                  <div className="absolute inset-0 bg-black/20" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
