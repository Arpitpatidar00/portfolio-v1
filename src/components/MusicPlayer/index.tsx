"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { SongCarousel } from "./SongCarousel";
import { ControlBar } from "./ControlBar";

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicPlayer = ({ isOpen, onClose }: MusicPlayerProps) => {
  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    progress,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    seek,
    setCurrentTrackIndex
  } = useAudioPlayer();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="fixed inset-0 z-[200] bg-gradient-to-b from-black via-zinc-950 to-zinc-900 backdrop-blur-3xl overflow-hidden flex flex-col"        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[160px] opacity-40" />
          </div>

          {/* Top Navigation */}
          <div className="relative z-50 flex items-center justify-between px-6 py-8 md:px-12">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 group text-white/40 hover:text-white transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                <ChevronLeft size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Back</span>
            </button>
            
            <div className="hidden md:flex flex-col items-center">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] font-bold">Now Playing</span>
            </div>
            
            <div className="w-24" />
          </div>



          {/* Center Space: Carousel & Captions */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <SongCarousel currentIndex={currentTrackIndex} onSelect={setCurrentTrackIndex} />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center px-6 mt-8 sm:mt-12"
            >
            </motion.div>
          </div>

          {/* Bottom Bar: Control Bar */}
          <ControlBar
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            volume={volume}
            onTogglePlay={togglePlay}
            onNext={nextTrack}
            onPrev={prevTrack}
            onVolumeChange={setVolume}
            onSeek={seek}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
};
