"use client";

import Image from "next/image";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { socialLinks } from "@/constants";

const SOCIALS = [
  {
    name: "LinkedIn",
    href: socialLinks.linkedin,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    name: "X",
    href: socialLinks.twitter,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    )
  },
  {
    name: "Instagram",
    href: socialLinks.instagram.url,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  },
  {
    name: "GitHub",
    href: socialLinks.github,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.5 6-6.76a5.5 5.5 0 0 0-1.5-3.8 5.1 5.1 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.1 5.1 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5.2 3 6.4 6 6.76A4.8 4.8 0 0 0 4 18v4" />
        <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
      </svg>
    )
  },
];

const MASK_TR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 104' width='220' height='104' fill='black'%3E%3Cpath d='M0 0 L6 0 C22 0 38 10 38 24 C38 56 54 80 97 80 L192 80 C206 80 220 90 220 104 L220 110 L0 110 Z'/%3E%3C/svg%3E")`;
const MASK_BL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 220' width='110' height='220' fill='black'%3E%3Cpath d='M0 0 L0 6 C0 22 10 38 24 38 C56 38 80 54 80 97 L80 192 C80 206 90 220 104 220 L110 220 L110 0 Z'/%3E%3C/svg%3E")`;

const COMBINED_MASK = [
  `${MASK_TR} top right / 220px 104px no-repeat`,
  `${MASK_BL} bottom left / 110px 220px no-repeat`,
  `linear-gradient(to bottom, black, black) top left / calc(100% - 220px) 104px no-repeat`,
  `linear-gradient(to bottom, black, black) left 0 top 104px / 100% calc(100% - 324px) no-repeat`,
  `linear-gradient(to bottom, black, black) bottom right / calc(100% - 110px) 220px no-repeat`
].join(", ");

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutQuint }
  }
} as const;

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(20px)", rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotate: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }
  }
};

export const HeroSection = () => {
  return (
    <section className="px-6 md:px-10 lg:px-16 pb-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center min-h-[85vh] ">
      {/* Left Column: Typography & Info */}
      <motion.div
        className="flex-1 flex flex-col justify-center space-y-8 md:space-y-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-4" variants={fadeUp}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6vw] font-black leading-[0.85] tracking-tighter !lowercase font-heading mt-6 md:mt-0">
            visual<br />Developer
          </h1>
          <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed font-medium pt-4 md:pl-10 lg:pl-[20%]">
            I am a visual developer with a passion for creating beautiful and interactive web experiences. I specialize in front-end development and use modern technologies to bring my ideas to life.
          </p>
        </motion.div>

        {/* Social Pills */}
        <motion.div className="flex flex-wrap gap-3 items-center" variants={staggerContainer}>
          {SOCIALS.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={popIn}
              whileHover={{ scale: 1.1, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div className="grid grid-cols-2 gap-8 pt-8" variants={staggerContainer}>
          <motion.div className="space-y-2" variants={fadeUp}>
            <span className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tighter">+15</span>
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest leading-relaxed">
              Working on Live<br />Projects
            </p>
          </motion.div>
          <motion.div className="space-y-2" variants={fadeUp}>
            <span className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tighter">2+</span>
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest leading-relaxed">
              Years of<br />Experience building imaginations into reality
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Column: Key Image with "Notched" UI */}
      <motion.div
        className="relative w-full lg:flex-1 h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] min-h-[400px] flex items-center justify-center"
        variants={imageReveal}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[#FBB040] overflow-hidden"
            style={{
              borderRadius: "36px",
              WebkitMaskImage: COMBINED_MASK,
              maskImage: COMBINED_MASK,
            }}
          >
            {/* Main Image */}
            <div className="relative w-full h-[110%] transform -translate-y-[5%]">
              <Image
                src="/self.png"
                alt="Portrait"
                fill
                className="object-contain object-bottom"
                unoptimized
              />
              <div className="absolute inset-0 bg-[#FBB040]/10 mix-blend-multiply pointer-events-none" />
            </div>
          </div>

          {/* Top Right Globe (matches image) */}
          <motion.div
            className="absolute top-2 -right-2 md:-right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-foreground rounded-full flex items-center justify-center z-30 shadow-2xl border-4 border-background"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", delay: 0.8, stiffness: 200 }}
            whileHover={{ rotate: 180, scale: 1.1 }}
          >
            <Globe className="text-background w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </motion.div>

          {/* Signature (top-left, exactly as in your image) */}
          <motion.div
            className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 pointer-events-none"
            initial={{ opacity: 0, x: -20, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <span
              className="text-white text-4xl sm:text-5xl md:text-6xl tracking-[-2px] font-light drop-shadow-md"
              style={{ fontFamily: "Brush Script MT, cursive" }}
            >
              Arpit
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
