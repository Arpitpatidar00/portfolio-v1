"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const EXPERIENCES = [
  {
    startDate: "AUG - 2025",
    endDate: "PRESENT",
    role: "Full stack developer/Web3 developer",
    company: "Metaverse Ventures Pvt. Ltd. (Remote)",
    duration: "8 MONTHS"
  },
  {
    startDate: "JULY- 2024",
    endDate: "AUG 2025",
    role: "Associate software Developer",
    company: "Amenses Innovation Pvt Ltd (On Site)",
    duration: "1 YEAR, 1 MONTH"
  },
  {
    startDate: "MAR 2024",
    endDate: "JULY 2024",
    role: "Software Developer Intern",
    company: "Amenses Innovation Pvt Ltd (On Site)",
    duration: "5 MONTHS"
  },
  {
    startDate: "Sep 2023",
    endDate: "Dec 2023",
    role: "Software Developer Trainee",
    company: "Amenses Innovation Pvt Ltd (College)",
    duration: "4 MONTHS"
  }
];

export const ExperienceSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showCursor, setShowCursor] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const activeDuration = hoveredIdx !== null ? EXPERIENCES[hoveredIdx].duration : "";
  const circleLabel = `${activeDuration}  ✦  ${activeDuration}  ✦  `;

  return (
    <section className="relative w-full bg-[#050505] px-6 md:px-10 lg:px-16 py-16 md:py-20 border-t border-white/5 cursor-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col relative z-10">

        {/* Header */}
        <div className="relative z-20 mb-16 flex flex-col text-center md:text-left">
          <span className="text-accent text-sm font-mono tracking-widest font-bold uppercase mb-2">
            (EXPERIENCE)
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-[#EAEAEA]">
            Work<br />History
          </h2>
        </div>

        <div
          className="w-full flex-grow flex flex-col border-t border-white/10"
          onMouseEnter={() => setShowCursor(true)}
          onMouseLeave={() => {
            setShowCursor(false);
            setHoveredIdx(null);
          }}
        >
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="relative flex flex-col md:flex-row md:items-center py-10 md:py-12 border-b border-white/10 group hover:bg-white/[0.02] transition-colors duration-300 cursor-none"
              onMouseEnter={() => setHoveredIdx(i)}
            >
              <div className="flex flex-col flex-shrink-0 w-[200px] mb-6 md:mb-0">
                <span className="text-white/40 text-[13px] md:text-sm tracking-widest uppercase mb-2 font-medium">
                  {exp.startDate}
                </span>
                <span className="text-white text-xl md:text-2xl uppercase font-bold tracking-wider">
                  {exp.endDate}
                </span>
              </div>

              <div className="hidden md:flex h-12 w-[1px] bg-white/20 mx-8 transition-colors duration-300 group-hover:bg-accent/50" />

              <div className="flex flex-col flex-grow">
                <h4 className="text-3xl md:text-[2.25rem] font-bold text-white mb-2 tracking-tight leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                  {exp.role}
                </h4>
                <span className="text-white/50 text-base md:text-lg font-medium">
                  {exp.company}
                </span>
              </div>

              <div className="flex-shrink-0 ml-auto flex items-center justify-center mt-6 md:mt-0 w-12 h-12 rounded-full border border-white/10 group-hover:bg-white/5 group-hover:border-white/20 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center w-[120px] h-[120px] rounded-full bg-[#EAEAEA] text-[#050505] shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showCursor && hoveredIdx !== null ? 1 : 0,
          scale: showCursor && hoveredIdx !== null ? 1 : 0.5
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <ArrowUpRight className="w-8 h-8 absolute z-10" />
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
          <path
            id="cursorTextPath"
            d="M 50, 50 m 0, -36 a 36,36 0 1,1 0,72 a 36,36 0 1,1 0,-72"
            fill="transparent"
          />
          <text className="text-[10px] font-bold uppercase tracking-widest fill-current">
            <textPath href="#cursorTextPath" startOffset="0">
              {circleLabel}
            </textPath>
          </text>
        </motion.svg>
      </motion.div>

    </section>
  );
};
