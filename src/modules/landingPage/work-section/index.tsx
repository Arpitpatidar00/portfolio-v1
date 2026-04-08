"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserRound,
  Snowflake,
  TreeDeciduous,
  Droplets,
  Sun,
  ArrowUpRight
} from "lucide-react";

/* ─── Work Data ───────────────────────────────────────────── */

const WORK_DATA = [
  {
    id: 1,
    title: "Blonkisoaz",
    subtitle: "Omuke trughte a otufta",
    image: "/selected-work/ubuntu.png",
    icon: UserRound,
    color: "#FF5E41",
  },
  {
    id: 2,
    title: "Viteru-X",
    subtitle: "Exploring the frost",
    image: "/selected-work/vireo.png",
    icon: Snowflake,
    color: "#4ECDC4",
  },
  {
    id: 3,
    title: "Iterususelle",
    subtitle: "Omuke trughte a otufta",
    image: "/selected-work/7wovs.png",
    icon: TreeDeciduous,
    color: "#FFC75F",
  },
  {
    id: 4,
    title: "Stable Flow",
    subtitle: "Fluid decentralized finance",
    image: "/selected-work/stable.png",
    icon: Droplets,
    color: "#6C5CE7",
  },
  {
    id: 5,
    title: "Sun-Set Devs",
    subtitle: "Bright management",
    image: "/selected-work/metasub.png",
    icon: Sun,
    color: "#FF7675",
  }
];

/* ─── Notch Component ───────────────────────────── */

const RedirectionBadge = ({ isExpanded }: { isExpanded: boolean }) => (
  <AnimatePresence>
    {isExpanded && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.5, rotate: -20 }}
        className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white flex items-center justify-center z-30 shadow-lg group"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUpRight size={20} className="text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.div>
    )}
  </AnimatePresence>
);

// Perfect mathematically smooth SVG squircle notch
const NOTCH_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 110' width='110' height='110' fill='black'%3E%3Cpath d='M0 0 L20 0 A20 20 0 0 1 40 20 A50 50 0 0 0 90 70 A20 20 0 0 1 110 90 L110 110 L0 110 Z'/%3E%3C/svg%3E") top right / 110px 110px no-repeat, linear-gradient(black, black) top left / calc(100% - 110px) 100% no-repeat, linear-gradient(black, black) bottom right / 110px calc(100% - 110px) no-repeat`;

/* ─── Expanding Card Component ────────────────────────────── */

interface CardProps {
  item: typeof WORK_DATA[0];
  isExpanded: boolean;
  onHover: () => void;
}

const ExpandingCard = ({ item, isExpanded, onHover }: CardProps) => {
  const Icon = item.icon;

  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onClick={onHover}
      className={`relative cursor-pointer overflow-hidden group transition-all duration-500 ${isExpanded ? "flex-[5] h-[400px] md:h-[480px]" : "flex-1 h-[250px] md:h-[480px]"
        }`}
      initial={false}
      animate={{
        borderRadius: "16px",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }}
    >
      {/* MASKED LAYER (Image + Overlays) – this is the fix */}
      {/* The notch is now ONLY on the background/image so the badge is never clipped */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMask: isExpanded ? NOTCH_MASK : "none",
          mask: isExpanded ? NOTCH_MASK : "none",
        }}
      >
        {/* Background Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority={isExpanded}
          unoptimized
        />

        {/* Overlays */}
        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-30 group-hover:opacity-10'}`} />

        {/* Gradient Bottom Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Redirection Badge – now sits perfectly in the top-right notch (outside the mask) */}
      <RedirectionBadge isExpanded={isExpanded} />

      {/* Expanded Content Label */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-4"
          >
            {/* White Circle Icon Badge */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shrink-0">
              <Icon size={24} className="text-black" />
            </div>

            <div className="flex flex-col text-white drop-shadow-md">
              <h3 className="text-2xl font-heading font-bold uppercase leading-none tracking-tighter">
                {item.title}
              </h3>
              <p className="text-sm font-sans opacity-90">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Icon View */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 inset-x-0 flex justify-center z-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
              <Icon size={20} className="text-black" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main Section ───────────────────────────────────────────── */

export const WorkSection = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section
      id="work-showcase"
      className="relative w-full flex flex-col items-center py-32 px-4 md:px-12 selection:bg-accent selection:text-background z-10 overflow-hidden border-t border-white/5"
      style={{
        minHeight: "100vh",
        background: "var(--background)"
      }}
    >
      {/* Structural Headers */}
      <div className="relative z-20 mb-20 flex flex-col text-center items-center">
        <span className="text-accent text-xs font-mono tracking-[0.4em] font-bold uppercase mb-4 opacity-80">
          (WORK GALLERY)
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-[#F5F5F5] leading-none mb-6">
          Selected Projects
        </h2>
      </div>

      {/* Expanding Accordion Gallery Container */}
      <div className="relative z-20 flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-4 items-stretch justify-center">
        {WORK_DATA.map((item, idx) => (
          <ExpandingCard
            key={item.id}
            item={item}
            isExpanded={activeIndex === idx}
            onHover={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      {/* Subtle Bottom Hint */}
      <motion.p
        className="mt-12 text-muted-foreground/30 text-[10px] font-mono tracking-[0.3em] uppercase"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        hover or click to expand
      </motion.p>
    </section>
  );
};