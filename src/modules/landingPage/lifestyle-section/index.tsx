"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { socialLinks } from "@/constants";

// The photo structure mimicking polaroids
const PHOTOS = [
  {
    id: 1,
    src: "/personal/image3.jpeg",
    title: "Rajasthan!",
    offsetX: "-380px",
    offsetY: "-200px",
    mobileOffsetX: "-120px",
    mobileOffsetY: "-180px",
    rotate: "-12deg",
    depth: 0.8,
    zIndex: 10,
  },
  {
    id: 2,
    src: "/personal/image2.jpg",
    title: "",
    offsetX: "-20px",
    offsetY: "-240px",
    mobileOffsetX: "100px",
    mobileOffsetY: "-160px",
    rotate: "5deg",
    depth: 1.2,
    zIndex: 5,
  },
  {
    id: 3,
    src: "/personal/image19.jpeg",
    title: "",
    offsetX: "320px",
    offsetY: "-150px",
    mobileOffsetX: "-100px",
    mobileOffsetY: "0px",
    rotate: "15deg",
    depth: 0.9,
    zIndex: 8,
  },
  {
    id: 4,
    src: "/personal/image23.jpeg",
    title: "Window",
    offsetX: "-360px",
    offsetY: "220px",
    mobileOffsetX: "110px",
    mobileOffsetY: "20px",
    rotate: "-8deg",
    depth: 1.1,
    zIndex: 15,
  },
  {
    id: 5,
    src: "/personal/image11.jpeg",
    title: "The Last Village",
    offsetX: "-80px",
    offsetY: "280px",
    mobileOffsetX: "-90px",
    mobileOffsetY: "200px",
    rotate: "2deg",
    depth: 0.7,
    zIndex: 12,
  },
  {
    id: 6,
    src: "/personal/image7.jpeg",
    title: "Late in Surrealism",
    offsetX: "180px",
    offsetY: "200px",
    mobileOffsetX: "80px",
    mobileOffsetY: "190px",
    rotate: "-5deg",
    depth: 1.3,
    zIndex: 7,
  },
  {
    id: 7,
    src: "/personal/image22.jpeg",
    title: "Swingin' upside-down",
    offsetX: "420px",
    offsetY: "180px",
    mobileOffsetX: "0px",
    mobileOffsetY: "360px",
    rotate: "10deg",
    depth: 1.0,
    zIndex: 14,
  }
];

// Provided raw sticker image layers mapped positionally
const STICKERS = [
  {
    src: "/Stickers/camera.png", // Camera
    offsetX: "-280px",
    offsetY: "-300px",
    mobileOffsetX: "-140px",
    mobileOffsetY: "-250px",
    rotate: "-15deg",
    depth: 1.8,
    zIndex: 30,
    width: 140,
    mobileWidth: 80
  },
  {
    src: "/Stickers/shoue.avif", // Shoes
    offsetX: "450px",
    offsetY: "-40px",
    mobileOffsetX: "140px",
    mobileOffsetY: "-80px",
    rotate: "25deg",
    depth: 2.0,
    zIndex: 30,
    width: 150,
    mobileWidth: 80
  },
  {
    src: "/Stickers/camel.png", // Camel Cart
    offsetX: "-420px",
    offsetY: "100px",
    mobileOffsetX: "-150px",
    mobileOffsetY: "120px",
    rotate: "-10deg",
    depth: 1.7,
    zIndex: 30,
    width: 180,
    mobileWidth: 90
  },
  {
    src: "/Stickers/camp.png", // Campfire
    offsetX: "380px",
    offsetY: "320px",
    mobileOffsetX: "130px",
    mobileOffsetY: "320px",
    rotate: "12deg",
    depth: 1.9,
    zIndex: 30,
    width: 130,
    mobileWidth: 70
  },
  {
    src: "/Stickers/jeep.png", // Jeep
    offsetX: "480px",
    offsetY: "-280px",
    mobileOffsetX: "150px",
    mobileOffsetY: "-230px",
    rotate: "18deg",
    depth: 1.6,
    zIndex: 30,
    width: 160,
    mobileWidth: 80
  },
  {
    src: "/Stickers/roadmap.png", // Roadmap Sign
    offsetX: "-450px",
    offsetY: "-150px",
    mobileOffsetX: "-130px",
    mobileOffsetY: "-100px",
    rotate: "-20deg",
    depth: 2.1,
    zIndex: 30,
    width: 140,
    mobileWidth: 70
  },

  {
    src: "/Stickers/horse.png", // Horse
    offsetX: "-180px",
    offsetY: "350px",
    mobileOffsetX: "-60px",
    mobileOffsetY: "350px",
    rotate: "-12deg",
    depth: 1.8,
    zIndex: 30,
    width: 150,
    mobileWidth: 80
  },
];

const IG_BADGES = [
  {
    handle: socialLinks.instagram.handle,
    url: socialLinks.instagram.url,
    offsetX: "-320px",
    offsetY: "360px",
    mobileOffsetX: "-100px",
    mobileOffsetY: "280px",
    rotate: "-6deg",
    depth: 1.4,
    zIndex: 25,
  },
  {
    handle: socialLinks.instagram.handle,
    url: socialLinks.instagram.url,
    offsetX: "260px",
    offsetY: "-280px",
    mobileOffsetX: "60px",
    mobileOffsetY: "-220px",
    rotate: "8deg",
    depth: 1.5,
    zIndex: 25,
  }
];


export const LifestyleSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Center-anchored coordinate system
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Maps screen bounds (-500ish to 500ish essentially relative to center)
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full h-[85vh] sm:h-[130vh] md:h-[130vh] lg:h-[150vh] bg-background overflow-hidden flex flex-col border-t border-white/5 group px-4 sm:px-6 md:px-10 lg:px-16 pt-10 pb-0 sm:py-16 md:py-20">

      {/* Header */}
      <div className="relative z-50 flex flex-col text-center md:text-left">
        <span className="text-accent text-xs sm:text-sm font-mono tracking-widest font-bold uppercase mb-2">
          (LIFESTYLE)
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-[#EAEAEA]">
          Beyond<br />The Screen
        </h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-0 h-0 flex items-center justify-center" style={{ transform: isMobile ? 'scale(0.65)' : 'scale(1)' }}>

          {/* 1. RENDER POLAROIDS */}
          {PHOTOS.map((data) => {
            const parallaxX = useTransform(smoothX, (v) => (v * 0.05 * data.depth));
            const parallaxY = useTransform(smoothY, (v) => (v * 0.05 * data.depth));
            const oX = isMobile ? data.mobileOffsetX : data.offsetX;
            const oY = isMobile ? data.mobileOffsetY : data.offsetY;

            return (
              <div
                key={`photo-${data.id}`}
                className="absolute pointer-events-none drop-shadow-2xl"
                style={{
                  left: oX,
                  top: oY,
                  zIndex: data.zIndex,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div
                  className="w-[220px] h-[260px] sm:w-[260px] sm:h-[300px] md:w-[320px] md:h-[380px] rounded-[12px] sm:rounded-[16px] bg-[#121212] p-2 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col"
                  style={{
                    rotate: data.rotate,
                    x: parallaxX,
                    y: parallaxY
                  }}
                >
                  <div className="relative w-full flex-grow rounded-[6px] sm:rounded-[8px] overflow-hidden bg-black/50">
                    <Image src={data.src} fill alt="Lifestyle" className="object-cover opacity-90 transition-transform duration-700 ease-out hover:scale-110 pointer-events-auto" unoptimized />
                  </div>
                  {data.title && (
                    <div className="w-full text-center mt-2 sm:mt-3 mb-1 sm:mb-2 text-white/50 opacity-80 text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                      {data.title}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}

          {/* 2. RENDER IG BADGES */}
          {IG_BADGES.map((badge, i) => {
            const parallaxX = useTransform(smoothX, (v) => (v * 0.08 * badge.depth));
            const parallaxY = useTransform(smoothY, (v) => (v * 0.08 * badge.depth));
            const oX = isMobile ? badge.mobileOffsetX : badge.offsetX;
            const oY = isMobile ? badge.mobileOffsetY : badge.offsetY;

            return (
              <div
                key={`badge-${i}`}
                className="absolute pointer-events-none transition-transform hover:scale-105"
                style={{
                  left: oX,
                  top: oY,
                  zIndex: badge.zIndex,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div
                  onClick={() => window.open(badge.url, '_blank')}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-2xl pointer-events-auto cursor-pointer"
                  style={{
                    rotate: badge.rotate,
                    x: parallaxX,
                    y: parallaxY
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="text-white font-bold tracking-widest text-[10px] sm:text-xs md:text-sm uppercase">
                    {badge.handle}
                  </span>
                </motion.div>
              </div>
            );
          })}

          {/* RENDER STICKERS */}
          {STICKERS.map((stick, i) => {
            if (stick.width === 0) return null;
            const parallaxX = useTransform(smoothX, (v) => (v * 0.12 * stick.depth));
            const parallaxY = useTransform(smoothY, (v) => (v * 0.12 * stick.depth));
            const oX = isMobile ? stick.mobileOffsetX : stick.offsetX;
            const oY = isMobile ? stick.mobileOffsetY : stick.offsetY;
            const w = isMobile ? stick.mobileWidth : stick.width;

            return (
              <div
                key={`stick-${i}`}
                className="absolute pointer-events-none drop-shadow-2xl"
                style={{
                  left: oX,
                  top: oY,
                  zIndex: stick.zIndex,
                  transform: 'translate(-50%, -50%)',
                  width: w
                }}
              >
                <motion.div
                  className="relative"
                  style={{
                    rotate: stick.rotate,
                    x: parallaxX,
                    y: parallaxY
                  }}
                >
                  <Image src={stick.src} width={w} height={w} className="w-full h-auto object-contain" alt="Sticker" unoptimized />
                </motion.div>
              </div>
            );
          })}

          {/* 4. CENTRAL TEXT PILL BADGE STICKER */}
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: '0px',
              top: '0px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              className="flex flex-col items-center drop-shadow-[0_0_80px_rgba(0,0,0,1)]"
              style={{
                x: useTransform(smoothX, (v) => v * 0.03),
                y: useTransform(smoothY, (v) => v * 0.03),
              }}
            >
              <div className="relative w-[280px] h-[100px] sm:w-[340px] sm:h-[120px] md:w-[500px] md:h-[180px] lg:w-[600px] lg:h-[220px]">
                <Image
                  src="/Stickers/text.avif"
                  fill
                  alt="This is where my mind wanders around"
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
