"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { connectSectionContent, routes } from "@/constants";

export const ConnectSection = () => {
  // Generate random stable positions for stars
  const router = useRouter();
  const [stars, setStars] = React.useState<any[]>([]);

  React.useEffect(() => {
    setStars(Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    })));
  }, []);

  return (
    <section className="relative w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-20 sm:py-28 md:py-48">

      {/* 1. Star Particle Layer */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: star.size,
              height: star.size,
              left: star.x,
              top: star.y,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 2. Content Matrix */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 md:gap-12 px-2 sm:px-6">

        {/* Top Tagline */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/60 text-base sm:text-lg md:text-2xl font-sans tracking-tight text-center"
        >
          {connectSectionContent.tagline}
        </motion.span>

        {/* Massive Pill Button */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative group px-8 py-6 sm:px-12 sm:py-8 md:px-32 md:py-16 rounded-[60px] sm:rounded-[80px] md:rounded-[100px] border border-white/20 hover:border-white/50 bg-transparent transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity" />
          <div onClick={() => router.push(routes.contact)} className="flex items-center gap-4 sm:gap-6 md:gap-12 text-white">
            <span
              className="text-2xl sm:text-4xl md:text-8xl font-bold font-heading tracking-tight">
              {connectSectionContent.cta}
            </span>
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-20 md:h-20 group-hover:translate-x-4 transition-transform duration-500" />
          </div>
        </motion.button>

        {/* Warning Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-xs sm:max-w-sm md:max-w-md text-center text-[9px] sm:text-[10px] md:text-xs text-white uppercase tracking-widest leading-relaxed pointer-events-none"
        >
          {connectSectionContent.warning}
        </motion.p>

      </div>

      {/* 3. Curved Horizon Transition (SVG) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[80px] sm:h-[100px] md:h-[200px]"
        >
          <path
            d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
            fill="#050505"
            className="drop-shadow-[0_-5px_15px_rgba(255,255,255,0.1)]"
          />
          {/* Subtle Glow Edge */}
          <path
            d="M0,0 C300,120 900,120 1200,0"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />
        </svg>
      </div>

    </section>
  );
};
