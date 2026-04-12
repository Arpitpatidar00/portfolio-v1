"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  // 🇮🇳 Indian Languages (Priority First)
  "Hello",
  "नमस्ते",        // Hindi
  "खम्मा घणी",     // Rajasthani ✅ FIXED
  "नमस्कारम्",     // Sanskrit (adds depth, not necessary but strong touch)
  "નમસ્તે",        // Gujarati
  "নমস্কার",       // Bengali
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",  // Punjabi
  "வணக்கம்",       // Tamil
  "నమస్తే",        // Telugu
  "ನಮಸ್ಕಾರ",      // Kannada
  "नमस्कार",       // Marathi
];
export const AppLoader = () => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index < LANGUAGES.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 220); // Adjusted for better readability
      return () => clearTimeout(timer);
    } else {
      // Stay on the last one for a moment before swiping
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  // Dispatch event when loader finishes so music can start
  useEffect(() => {
    if (!loading) {
      window.dispatchEvent(new CustomEvent("app-loader-complete"));
    }
  }, [loading]);

  const handleSkip = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
          />

          {/* Central Greeting */}
          <div className="relative flex flex-col items-center">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-white/40 font-mono text-xs tracking-[0.4em] uppercase">
                  Initializing Experience
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter">
                {LANGUAGES[index]}
              </h1>
            </motion.div>
          </div>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleSkip}
            className="absolute bottom-10 right-10 flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all group pointer-events-auto"
          >
            <span className="text-white/60 font-mono text-[10px] tracking-widest uppercase group-hover:text-white transition-colors">
              Skip Intro
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
          </motion.button>

          {/* Progress Indicator (Subtle) */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${((index + 1) / LANGUAGES.length) * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
