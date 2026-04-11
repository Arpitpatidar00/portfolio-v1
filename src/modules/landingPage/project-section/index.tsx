"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────── */

const ALL_IMAGES = [
  {
    title: "AI & Innovation",
    image: "/icons/antigravity.svg",
    skillIcons: ["/icons/antigravity.svg", "/icons/google-gemini.svg", "/icons/chatgpt.svg", "/icons/claude.svg"],
    color: "#FF6B00"
  },
  {
    title: "IDE & Tools",
    image: "/icons/vscode.svg",
    skillIcons: ["/icons/vscode.svg", "/icons/cursor.svg", "/icons/github-copilot.svg", "/icons/postman.webp"],
    color: "#007ACC"
  },
  {
    title: "Languages",
    image: "/icons/javascript.svg",
    skillIcons: ["/icons/typescript.svg", "/icons/javascript.svg", "/icons/github.svg"],
    color: "#F7DF1E"
  },
  {
    title: "UI Frameworks",
    image: "/icons/nextjs.svg",
    skillIcons: ["/icons/react.svg", "/icons/nextjs.svg", "/icons/tailwind.svg"],
    color: "#61DAFB"
  },
  {
    title: "Styling",
    image: "/icons/tailwind.svg",
    skillIcons: ["/icons/tailwind.svg", "/icons/shadcn-ui.svg", "/icons/mui.svg"],
    color: "#38B2AC"
  },
  {
    title: "Backend",
    image: "/icons/nodejs.svg",
    skillIcons: ["/icons/nodejs.svg", "/icons/nestjs.svg", "/icons/express.svg"],
    color: "#339933"
  },
  {
    title: "Database",
    image: "/icons/mongodb.svg",
    skillIcons: ["/icons/mongodb.svg", "/icons/supabase.svg", "/icons/docker.svg"],
    color: "#47A248"
  },
  {
    title: "Cloud",
    image: "/icons/aws.svg",
    skillIcons: ["/icons/aws.svg", "/icons/cloudflare.svg", "/icons/docker.svg", "/icons/s3.svg"],
    color: "#FF9900"
  },
  {
    title: "Web3",
    image: "/icons/metamask.svg",
    skillIcons: ["/icons/ethereum.svg", "/icons/metamask.svg", "/icons/usdc.svg"],
    color: "#3C3C3D"
  },
  {
    title: "Deployment",
    image: "/icons/cloudflare.svg",
    skillIcons: ["/icons/vercel.svg", "/icons/render.svg", "/icons/cloudflare.svg"],
    color: "#000000"
  },
  {
    title: "Payments",
    image: "/icons/usdt.svg",
    skillIcons: ["/icons/stripe.svg", "/icons/razorpay-icon.svg", "/icons/usdt.svg"],
    color: "#635BFF"
  },
  {
    title: "DevOps",
    image: "/icons/docker.svg",
    skillIcons: ["/icons/docker.svg", "/icons/github.svg", "/icons/cloudflare.svg"],
    color: "#2496ED"
  },
  {
    title: "State Mgmt",
    image: "/icons/zustand.svg",
    skillIcons: ["/icons/zustand.svg", "/icons/redux.svg", "/icons/react.svg"],
    color: "#764ABC"
  }
];

const TOP_IMAGES = ALL_IMAGES.slice(0, 7);
const BOT_IMAGES = ALL_IMAGES.slice(7, 13);

const N_TOTAL = 13;
const SPACING = 420;
const CARD_SIZE_PX = 340;

// Universal Structural Vectors
const L_TOTAL = N_TOTAL * SPACING;
const R_FINAL = L_TOTAL / (2 * Math.PI);

// Represents the absolute 100% boundary limit in exact coordinates
// Bounding boundary = Diameter + Extruded Outer Card Edge Padding
const GEOMETRY_SIZE = (2 * R_FINAL) + CARD_SIZE_PX;



/* ─── Card Shapes ───────────────────────────────── */

const FloatingIcon = ({ src, delay, index, totalItems }: { src: string; delay: number; index: number; totalItems: number }) => {
  // Calculate a varied position, reaching OUTSIDE the 280x280 card.
  // We use totalItems to evenly distribute them around the circle so they NEVER overlap, even with 4+ items.
  const angle = (index * (360 / totalItems) + (Math.random() * 20 - 10)) * (Math.PI / 180);
  const radius = 180 + Math.random() * 40;
  const baseX = Math.cos(angle) * radius;
  const baseY = Math.sin(angle) * radius;

  return (
    <motion.div
      variants={{
        rest: { opacity: 0, scale: 0, x: 0, y: 0, transition: { duration: 0.4 } },
        hover: {
          opacity: 1,
          scale: 1,
          x: baseX,
          y: baseY,
          transition: { type: "spring", bounce: 0.5, duration: 0.8, delay }
        }
      }}
      className="absolute z-50 pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        marginLeft: "-48px", // Half of approximately 96px total width
        marginTop: "-48px",
      }}
    >
      <motion.div
        animate={{
          y: [-25, 25, -25],
          x: [-15, 15, -15],
          rotate: [-15, 15, -15]
        }}
        transition={{
          y: { duration: 3.5 + Math.random(), repeat: Infinity, ease: "easeInOut" },
          x: { duration: 4.5 + Math.random(), repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }
        }}
        className="p-3 sm:p-4 bg-white/10 backdrop-blur-2xl rounded-[24px] sm:rounded-[32px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/20 transition-colors"
      >
        <Image src={src} width={80} height={80} alt="Skill" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain filter drop-shadow-2xl brightness-110" unoptimized />
      </motion.div>
    </motion.div>
  );
};


const TopCard = ({ index, p, item }: { index: number; p: MotionValue<number>; item: typeof ALL_IMAGES[0] }) => {
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
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="absolute top-1/2 left-1/2 w-[340px] h-[340px] -ml-[170px] -mt-[170px] rounded-[24px] overflow-visible group"
      style={{ x, y, rotate }}
    >
      <motion.div
        className="relative w-full h-full border border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto cursor-pointer bg-white/5 backdrop-blur-xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        style={{
          borderRadius: "22px",
        }}
      >
        <Image src={item.image} fill alt={item.title} className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300 p-12" unoptimized />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-20">
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-1">Category</span>
            <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tight leading-none">{item.title}</h3>
          </div>
        </div>

        {/* Dynamic Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${item.color}, transparent)` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none" />
      </motion.div>

      {/* Floating Icons Overlay - Outside overflow-hidden so they can fly out */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {item.skillIcons.map((icon, si) => (
          <FloatingIcon key={si} src={icon} delay={si * 0.1} index={si} totalItems={item.skillIcons.length} />
        ))}
      </div>
    </motion.div>
  );
};

const BotCard = ({ index, p, item }: { index: number; p: MotionValue<number>; item: typeof ALL_IMAGES[0] }) => {
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
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="absolute top-1/2 left-1/2 w-[340px] h-[340px] -ml-[170px] -mt-[170px] rounded-[24px] overflow-visible group"
      style={{ x, y, rotate }}
    >
      <motion.div
        className="relative w-full h-full border border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto cursor-pointer bg-white/5 backdrop-blur-xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + (index % 2), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        style={{
          borderRadius: "22px",
        }}
      >
        <Image src={item.image} fill alt={item.title} className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300 p-12" unoptimized />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-20">
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-1">Category</span>
            <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tight leading-none">{item.title}</h3>
          </div>
        </div>

        {/* Dynamic Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${item.color}, transparent)` }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none" />
      </motion.div>

      {/* Floating Icons Overlay - Outside overflow-hidden so they can fly out */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {item.skillIcons.map((icon, si) => (
          <FloatingIcon key={si} src={icon} delay={si * 0.1} index={si} totalItems={item.skillIcons.length} />
        ))}
      </div>
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

  const clamShellProgress = useTransform(scrollYProgress, [0.0, 0.4], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.35, 0.55], [0.8, 1]);
  const globalRotation = useTransform(scrollYProgress, [0.6, 0.95], [0, 90]);

  useEffect(() => {
    const handleResize = () => {
      // Calculate padding based on Tailwind standard breakpoints
      const isMobile = window.innerWidth < 640;
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 768;

      // Match the classes: px-4 sm:px-6 md:px-10 lg:px-16
      const padX = isDesktop ? 64 * 2 : (isTablet ? 40 * 2 : (isMobile ? 16 * 2 : 24 * 2));
      // Match the classes: py-12 sm:py-16 md:py-20
      const padY = isTablet ? 80 * 2 : (isMobile ? 48 * 2 : 64 * 2);

      const exactScaleH = (window.innerHeight - padY) / GEOMETRY_SIZE;
      const exactScaleW = (window.innerWidth - padX) / GEOMETRY_SIZE;

      setDynamicScale(Math.min(exactScaleH, exactScaleW));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-background z-10 border-t border-white/5">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent" />
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grid-pattern" />

        <div
          className="relative w-full h-full flex items-center justify-center origin-center transition-transform duration-200"
          style={{ transform: `scale(${dynamicScale})` }}
        >

          <motion.div
            className="relative z-10 text-center flex flex-col items-center justify-center font-heading pointer-events-none select-none drop-shadow-2xl"
            style={{ opacity: textOpacity, scale: textScale }}
          >
            <h2 className="text-[10vw] sm:text-[10vw] md:text-5xl lg:text-[6vw] font-bold uppercase tracking-tight text-[#EAEAEA] leading-[1.05]">
              -NOT JUST A<br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-[#FF6B00] to-[#FFD000] tracking-tighter block my-1 sm:my-2 drop-shadow-[0_0_40px_rgba(255,107,0,0.3)] accent-glow">
                DESIGNER
              </span>
              I AM A<br />
              CREATIVE<br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-[#FF6B00] to-[#FFD000] tracking-tighter block mt-1 sm:mt-2 drop-shadow-[0_0_40px_rgba(255,107,0,0.3)] accent-glow">
                ARTIST.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ rotate: globalRotation }}
          >
            {TOP_IMAGES.map((item, i) => (
              <TopCard key={`top-${i}`} index={i} p={clamShellProgress} item={item} />
            ))}

            {BOT_IMAGES.map((item, i) => (
              <BotCard key={`bot-${i}`} index={i} p={clamShellProgress} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
