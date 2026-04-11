"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const EXPERIENCES = [
  {
    startDate: "AUG - 2025",
    endDate: "PRESENT",
    role: "Full stack developer/Web3 developer",
    company: "Metaverse Ventures Pvt. Ltd. (Remote)",
    duration: "8 MONTHS",
    details: [
      "Leading development of high-fidelity metaverse ecosystems with real-time interactions.",
      "Architecting scalable Web3 infrastructure for decentralized asset management.",
      "Optimizing complex payment logic and edgecases for critical business logic.",
      "Implementing advanced 3D visualizers and cross-chain bridging and swaping protocols."
    ]
  },
  {
    startDate: "JULY- 2024",
    endDate: "AUG 2025",
    role: "Associate software Developer",
    company: "Amenses Innovation Pvt Ltd (On Site)",
    duration: "1 YEAR, 1 MONTH",
    details: [
      "Developed high-performance enterprise applications for industrial logistics.",
      "Collaborated on design system architecture to maintain visual consistency.",
      "Modernized legacy Node.js systems into streamlined Next.js environments.",
      "Delivered pixel-perfect interactive experiences for high-profile clients."
    ]
  },
  {
    startDate: "MAR 2024",
    endDate: "JULY 2024",
    role: "Software Developer Intern",
    company: "Amenses Innovation Pvt Ltd (On Site)",
    duration: "5 MONTHS",
    details: [
      "Working on the live project taking the leadership and helping the team to deliver the project on time.",
      "Conducted rigorous UI/UX testing across multiple browser kernels.",
      "Contributed to core product features under senior mentorship.",
      "Git branching strategies understand the docker and basic cloud concepts."
    ]
  },
  {
    startDate: "AUG 2023",
    endDate: "NOV 2023",
    role: "Software Developer Trainee",
    company: "Amenses Innovation Pvt Ltd (College)",
    duration: "4 MONTHS",
    details: [
      "Fast-tracked software engineering fundamentals through rigorous workshops.",
      "Built and deployed a series of utility-driven web applications.",
      "Focused on mastering full-stack Javascript and database optimization.",
      "Collaborated on agile projects to simulate real-world agency conditions."
    ]
  }
];

export const ExperienceSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [selectedExpIdx, setSelectedExpIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setShowCursor(isInside);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const activeDuration = hoveredIdx !== null ? EXPERIENCES[hoveredIdx].duration : "";
  const circleLabel = `${activeDuration}  ✦  ${activeDuration}  ✦  `;

  return (
    <section className="relative w-full bg-[#050505] px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 border-t border-white/5 cursor-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col relative z-10">

        {/* Header */}
        <div className="relative z-20 mb-10 sm:mb-12 md:mb-16 flex flex-col text-center md:text-left">
          <span className="text-accent text-xs sm:text-sm font-mono tracking-widest font-bold uppercase mb-2">
            (EXPERIENCE)
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-[#EAEAEA]">
            Work<br />History
          </h2>
        </div>

        <div
          ref={containerRef}
          className="w-full flex-grow flex flex-col border-t border-white/10"
        >
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="relative flex flex-col md:flex-row md:items-center py-6 sm:py-8 md:py-12 border-b border-white/10 group hover:bg-white/[0.02] transition-colors duration-300 md:cursor-none"
              onMouseEnter={() => setHoveredIdx(i)}
            >
              <div className="flex flex-col flex-shrink-0 md:w-[200px] mb-3 sm:mb-4 md:mb-0">
                <span className="text-white/40 text-[11px] sm:text-[13px] md:text-sm tracking-widest uppercase mb-1 sm:mb-2 font-medium">
                  {exp.startDate}
                </span>
                <span className="text-white text-lg sm:text-xl md:text-2xl uppercase font-bold tracking-wider">
                  {exp.endDate}
                </span>
              </div>

              <div className="hidden md:flex h-12 w-[1px] bg-white/20 mx-8 transition-colors duration-300 group-hover:bg-accent/50" />

              <div className="flex flex-col flex-grow">
                <h4 className="text-xl sm:text-2xl md:text-[2.25rem] font-bold text-white mb-1 sm:mb-2 tracking-tight leading-[1.1] sm:leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                  {exp.role}
                </h4>
                <span className="text-white/50 text-sm sm:text-base md:text-lg font-medium">
                  {exp.company}
                </span>
                {/* Mobile duration badge */}
                <span className="text-accent/70 text-[10px] sm:text-xs font-mono tracking-widest uppercase mt-2 md:hidden">
                  {exp.duration}
                </span>
              </div>

              <div
                className="flex-shrink-0 md:ml-auto flex items-center justify-center mt-4 sm:mt-5 md:mt-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-white/10 group-hover:bg-white/5 group-hover:border-white/20 transition-all duration-300 self-end md:self-auto cursor-pointer"
                onClick={() => setSelectedExpIdx(i)}
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExpIdx !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpIdx(null)}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`exp-modal-${selectedExpIdx}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4 sm:p-6"
            >
              <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col relative max-h-[90vh] sm:max-h-[80vh]">
                {/* Header with Grain and Glow */}
                <div className="relative p-6 sm:p-10 border-b border-white/5 bg-white/[0.02]">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
                  />
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-accent text-xs font-mono tracking-widest font-bold uppercase mb-2">
                        {EXPERIENCES[selectedExpIdx].company}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white leading-tight">
                        {EXPERIENCES[selectedExpIdx].role}
                      </h3>
                      <p className="text-white/40 text-xs sm:text-sm font-mono mt-2 tracking-wider">
                        {EXPERIENCES[selectedExpIdx].startDate} — {EXPERIENCES[selectedExpIdx].endDate}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedExpIdx(null)}
                      className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
                  <div className="space-y-6 sm:space-y-8">
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-4 sm:mb-6">
                        (ACHIEVEMENTS & IMPACT)
                      </span>
                      <ul className="space-y-4 sm:space-y-6">
                        {EXPERIENCES[selectedExpIdx].details?.map((detail, idx) => (
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            key={idx}
                            className="flex gap-3 sm:gap-4 items-start"
                          >
                            <div className="mt-1.5 sm:mt-2 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent shrink-0" />
                            <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                              {detail}
                            </p>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Badge */}
                <div className="p-4 sm:p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                  <span className="text-white/20 text-[10px] font-mono tracking-widest uppercase">
                    ID: EX-0{selectedExpIdx + 1}
                  </span>
                  <div className="px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
                    <span className="text-accent text-[10px] font-mono tracking-[0.2em] font-bold uppercase">
                      {EXPERIENCES[selectedExpIdx].duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom cursor - hidden on mobile/touch devices */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none items-center justify-center w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] rounded-full bg-[#EAEAEA] text-[#050505] shadow-[0_0_50px_rgba(255,255,255,0.2)] hidden md:flex"
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
        <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 absolute z-10" />
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
