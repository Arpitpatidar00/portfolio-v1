"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────── */

const ALL_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553835973-dec43bfddbb9?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=400&auto=format&fit=crop"
];

const TOP_IMAGES = ALL_IMAGES.slice(0, 7);
const BOT_IMAGES = ALL_IMAGES.slice(7, 13);

const N_TOTAL = 13;
const SPACING = 340;
const CARD_SIZE_PX = 280;

// Universal Structural Vectors
const L_TOTAL = N_TOTAL * SPACING;
const R_FINAL = L_TOTAL / (2 * Math.PI);

// Represents the absolute 100% boundary limit in exact coordinates
// Bounding boundary = Diameter + Extruded Outer Card Edge Padding
const GEOMETRY_SIZE = (2 * R_FINAL) + CARD_SIZE_PX;



/* ─── Card Shapes ───────────────────────────────── */


const TopCard = ({ index, p, src }: { index: number; p: MotionValue<number>; src: string }) => {
  const xBase = (index - 3) * SPACING;

  const x = useTransform(p, (v: number) => {
    const k = Math.max(v * (1 / R_FINAL), 0.0001);
    const r = 1 / k;
    const theta = xBase / r;
    return Math.sin(theta) * r;
  });

  const y = useTransform(p, (v: number) => {
    const k = Math.max(v * (1 / R_FINAL), 0.0001);
    const r = 1 / k;
    const theta = xBase / r;
    return r - Math.cos(theta) * r - R_FINAL;
  });

  const rotate = useTransform(p, (v: number) => {
    const k = Math.max(v * (1 / R_FINAL), 0.0001);
    const r = 1 / k;
    const theta = xBase / r;
    return theta * (180 / Math.PI);
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -ml-[140px] -mt-[140px] rounded-[16px] overflow-visible"
      style={{ x, y, rotate }}
    >
      <motion.div
        className="relative w-full h-full border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        style={{
          borderRadius: "14px",
        }}
      >
        <Image src={src} fill alt="Project" className="object-cover opacity-100" unoptimized />
        {/* Subtle inner blackout vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
      </motion.div>

    </motion.div>
  );
};

const BotCard = ({ index, p, src }: { index: number; p: MotionValue<number>; src: string }) => {
  const thetaFinal = ((index - 2.5) * SPACING) / R_FINAL;

  const theta = useTransform(p, (v: number) => {
    return v * thetaFinal;
  });

  const x = useTransform(theta, (t: number) => {
    return Math.sin(t) * R_FINAL;
  });

  const y = useTransform(theta, (t: number) => {
    return Math.cos(t) * R_FINAL;
  });

  const rotate = useTransform(theta, (t: number) => {
    return 180 - (t * (180 / Math.PI));
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -ml-[140px] -mt-[140px] rounded-[16px] overflow-visible"
      style={{ x, y, rotate }}
    >
      <motion.div
        className="relative w-full h-full border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + (index % 2), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        style={{
          borderRadius: "14px",
        }}
      >
        <Image src={src} fill alt="Project" className="object-cover opacity-100" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
      </motion.div>

    </motion.div>
  );
};

/* ─── Main Section ───────────────────────────────────────────── */

export const ProjectSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const clamShellProgress = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.35, 0.45], [0.8, 1]);
  const globalRotation = useTransform(scrollYProgress, [0.5, 0.95], [0, 180]);

  useEffect(() => {
    const handleResize = () => {
      const exactScaleH = window.innerHeight / GEOMETRY_SIZE;
      const exactScaleW = window.innerWidth / GEOMETRY_SIZE;
      setDynamicScale(Math.min(exactScaleH, exactScaleW));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[600vh] w-full bg-background z-10 border-t border-white/5">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#051010]">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent" />
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grid-pattern" />

        <div
          className="relative w-full h-full flex items-center justify-center origin-center transition-transform duration-200"
          style={{ transform: `scale(${dynamicScale})` }}
        >

          <motion.div
            className="relative z-10 text-center flex flex-col items-center justify-center font-heading pointer-events-none select-none drop-shadow-2xl"
            style={{ opacity: textOpacity, scale: textScale }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-bold uppercase tracking-tight text-[#EAEAEA] leading-[1.05]">
              -NOT JUST A<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF6B00] to-[#FFD000] tracking-tighter block my-2 drop-shadow-[0_0_40px_rgba(255,107,0,0.3)]">
                DESIGNER
              </span>
              I AM A<br />
              CREATIVE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF6B00] to-[#FFD000] tracking-tighter block mt-2 drop-shadow-[0_0_40px_rgba(255,107,0,0.3)]">
                ARTIST.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ rotate: globalRotation }}
          >
            {TOP_IMAGES.map((src, i) => (
              <TopCard key={`top-${i}`} index={i} p={clamShellProgress} src={src} />
            ))}

            {BOT_IMAGES.map((src, i) => (
              <BotCard key={`bot-${i}`} index={i} p={clamShellProgress} src={src} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
