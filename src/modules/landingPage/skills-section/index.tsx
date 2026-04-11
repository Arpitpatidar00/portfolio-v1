"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Tag {
  text: string;
  x: string;
  y: string;
  mobileX: string;
  mobileY: string;
  rotate: string;
  color: string;
}

interface SkillCategory {
  name: string;
  tags: Tag[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Interface Engineering",
    tags: [
      { text: "React", x: "-15vw", y: "-10vh", mobileX: "-30vw", mobileY: "-8vh", rotate: "-5deg", color: "bg-[#111111] text-white" },
      { text: "Next.js", x: "12vw", y: "8vh", mobileX: "20vw", mobileY: "7vh", rotate: "2deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "TypeScript", x: "-20vw", y: "5vh", mobileX: "-25vw", mobileY: "5vh", rotate: "-8deg", color: "bg-white/10 text-white backdrop-blur-sm" },
      { text: "Tailwind CSS", x: "18vw", y: "-5vh", mobileX: "25vw", mobileY: "-6vh", rotate: "6deg", color: "bg-white/10 text-white" },
      { text: "Framer Motion", x: "-5vw", y: "15vh", mobileX: "-5vw", mobileY: "10vh", rotate: "-4deg", color: "bg-[#111111] text-white border border-white/10" }
    ]
  },
  {
    name: "Backend Systems",
    tags: [
      { text: "Node.js", x: "-18vw", y: "-8vh", mobileX: "-28vw", mobileY: "-7vh", rotate: "-10deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "Nest.js", x: "10vw", y: "-10vh", mobileX: "15vw", mobileY: "-8vh", rotate: "6deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "Express.js", x: "15vw", y: "12vh", mobileX: "22vw", mobileY: "9vh", rotate: "5deg", color: "bg-[#111111] text-white border border-white/10" },
      { text: "MongoDB", x: "-12vw", y: "10vh", mobileX: "-18vw", mobileY: "8vh", rotate: "-5deg", color: "bg-white/10 text-white backdrop-blur-sm" },
      { text: "Supabase", x: "22vw", y: "5vh", mobileX: "30vw", mobileY: "4vh", rotate: "4deg", color: "bg-white/10 text-white backdrop-blur-sm" },
      { text: "REST APIs", x: "18vw", y: "-4vh", mobileX: "25vw", mobileY: "-3vh", rotate: "8deg", color: "bg-white/10 text-white" },
      { text: "Authentication", x: "-25vw", y: "6vh", mobileX: "-32vw", mobileY: "5vh", rotate: "-6deg", color: "bg-[#111111] text-white border border-white/10" }
    ]
  },
  {
    name: "System Design",
    tags: [
      { text: "Scalable Architecture", x: "-22vw", y: "-12vh", mobileX: "-28vw", mobileY: "-9vh", rotate: "-15deg", color: "bg-[#111111] text-white border border-white/10" },
      { text: "API Design", x: "18vw", y: "10vh", mobileX: "22vw", mobileY: "8vh", rotate: "8deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "Database Modeling", x: "-15vw", y: "15vh", mobileX: "-20vw", mobileY: "10vh", rotate: "-2deg", color: "bg-white/10 text-white backdrop-blur-sm" },
      { text: "Caching Strategies", x: "25vw", y: "-8vh", mobileX: "28vw", mobileY: "-6vh", rotate: "6deg", color: "bg-white/10 text-white" },
      { text: "Performance Optimization", x: "-28vw", y: "5vh", mobileX: "-30vw", mobileY: "4vh", rotate: "-6deg", color: "bg-[#111111] text-white border border-white/10" }
    ]
  },
  {
    name: "Fintech Infrastructure",
    tags: [
      { text: "Stablecoin Payments", x: "-25vw", y: "-10vh", mobileX: "-28vw", mobileY: "-8vh", rotate: "-8deg", color: "bg-[#111111] text-white border border-white/10" },
      { text: "Wallet Integration", x: "-20vw", y: "10vh", mobileX: "-24vw", mobileY: "8vh", rotate: "-5deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "Onchain Transactions", x: "22vw", y: "-12vh", mobileX: "25vw", mobileY: "-9vh", rotate: "10deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "Subscription Systems", x: "18vw", y: "15vh", mobileX: "22vw", mobileY: "10vh", rotate: "5deg", color: "bg-white/20 text-white backdrop-blur-md border border-white/10" },
      { text: "Payment Flows", x: "0vw", y: "-18vh", mobileX: "0vw", mobileY: "-12vh", rotate: "4deg", color: "bg-white/10 text-white" }
    ]
  },
  {
    name: "Integrations & Intelligence",
    tags: [
      { text: "Stripe API", x: "-22vw", y: "-12vh", mobileX: "-28vw", mobileY: "-9vh", rotate: "-10deg", color: "bg-[#111111] text-white border border-white/10" },
      { text: "Razorpay", x: "20vw", y: "10vh", mobileX: "25vw", mobileY: "8vh", rotate: "8deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "Webhooks", x: "-18vw", y: "15vh", mobileX: "-22vw", mobileY: "10vh", rotate: "-2deg", color: "bg-white/10 text-white backdrop-blur-sm" },
      { text: "Third-Party APIs", x: "25vw", y: "-8vh", mobileX: "28vw", mobileY: "-6vh", rotate: "6deg", color: "bg-white/10 text-white" },
      { text: "OpenAI API", x: "-28vw", y: "5vh", mobileX: "-30vw", mobileY: "4vh", rotate: "-6deg", color: "bg-[#111111] text-white border border-white/10" },
      { text: "AI Integrations", x: "0vw", y: "-18vh", mobileX: "0vw", mobileY: "-12vh", rotate: "4deg", color: "bg-[#FFD700] text-black font-bold" }
    ]
  },
  {
    name: "DevOps & Tooling",
    tags: [
      { text: "Docker", x: "-18vw", y: "-10vh", mobileX: "-25vw", mobileY: "-8vh", rotate: "-10deg", color: "bg-[#111111] text-white border border-white/10" },
      { text: "CI/CD", x: "15vw", y: "12vh", mobileX: "20vw", mobileY: "9vh", rotate: "5deg", color: "bg-[#FFD700] text-black font-bold" },
      { text: "Git & GitHub", x: "-12vw", y: "8vh", mobileX: "-18vw", mobileY: "7vh", rotate: "-5deg", color: "bg-white/10 text-white backdrop-blur-sm" },
      { text: "AWS", x: "22vw", y: "-5vh", mobileX: "28vw", mobileY: "-4vh", rotate: "7deg", color: "bg-white/10 text-white" }
    ]
  },
];



export const SkillsSection = () => {
  const router = useRouter()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(1); // Match the mockup image by defaulting to Index 1 (GRAPHICS)
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative w-full bg-[#050505] flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 overflow-hidden border-t border-white/5">

      {/* Background Dim Layer */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 mb-12 sm:mb-16 md:mb-24 flex flex-col text-center md:text-left w-full max-w-7xl mx-auto">
        <span className="text-accent text-xs sm:text-sm font-mono tracking-widest font-bold uppercase mb-2">
          (SKILLS)
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-[#EAEAEA]">
          Core<br />Expertise
        </h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center gap-6 sm:gap-8 md:gap-16">
        {SKILL_CATEGORIES.map((skill, idx) => (
          <div
            key={skill.name}
            className="relative w-full flex items-center justify-center py-4 sm:py-6 md:py-10 transition-all duration-500 cursor-pointer group"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(1)}
            onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
          >
            {/* Category Text */}
            <motion.h2
              className={`text-[clamp(1.5rem,8vw,7rem)] font-bold font-heading text-center leading-[0.9] tracking-tighter uppercase transition-all duration-500 pointer-events-none`}
              style={{
                WebkitTextStroke: hoveredIdx === idx ? 'none' : '1px rgba(255,255,255,0.06)',
              }}
              animate={{
                opacity: 1,
                color: hoveredIdx === idx ? "#EAEAEA" : "rgba(255,255,255,0.15)",
                scale: hoveredIdx === idx ? 1.05 : 1
              }}
            >
              {skill.name}
            </motion.h2>

            {/* Dynamic Tags (Pills) */}
            <AnimatePresence>
              {hoveredIdx === idx && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {skill.tags.map((tag, tagIdx) => (
                    <motion.div
                      key={tag.text}
                      initial={{ opacity: 0, scale: 0.5, x: "0%", y: "0%", rotate: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: isMobile ? tag.mobileX : tag.x,
                        y: isMobile ? tag.mobileY : tag.y,
                        rotate: tag.rotate
                      }}
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        delay: tagIdx * 0.05
                      }}
                      className={`absolute px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 ${tag.color}`}
                    >
                      {tag.text}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Button at the bottom */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 sm:mt-16 md:mt-32 flex items-center gap-6 sm:gap-8 md:gap-12 pl-6 sm:pl-8 md:pl-10 pr-2 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md group hover:border-accent/50 transition-all duration-300 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        onClick={() => router.push("/projects")}
      >
        <span className="text-white/80 font-medium tracking-wide text-xs sm:text-sm md:text-base group-hover:text-white transition-colors">
          Explore All Works
        </span>
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#EAEAEA] rounded-full text-[#111111] transition-transform group-hover:scale-110">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
      </motion.button>

    </section>
  );
};
