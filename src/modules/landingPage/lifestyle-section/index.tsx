"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// The photo structure mimicking polaroids
const PHOTOS = [
  {
    id: 1,
    src: "/personal/image3.jpeg",
    title: "Rajasthan!",
    offsetX: "-380px",
    offsetY: "-200px",
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
    rotate: "-15deg",
    depth: 1.8,
    zIndex: 30,
    width: 140
  },
  {
    src: "/Stickers/shoue.avif", // Shoes
    offsetX: "450px",
    offsetY: "-40px",
    rotate: "25deg",
    depth: 2.0,
    zIndex: 30,
    width: 150
  },
  {
    src: "/Stickers/camel.png", // Camel Cart
    offsetX: "-420px",
    offsetY: "100px",
    rotate: "-10deg",
    depth: 1.7,
    zIndex: 30,
    width: 180
  },
  {
    src: "/Stickers/camp.png", // Campfire
    offsetX: "380px",
    offsetY: "320px",
    rotate: "12deg",
    depth: 1.9,
    zIndex: 30,
    width: 130
  },
  {
    src: "/Stickers/jeep.png", // Jeep
    offsetX: "480px",
    offsetY: "-280px",
    rotate: "18deg",
    depth: 1.6,
    zIndex: 30,
    width: 160
  },
  {
    src: "/Stickers/roadmap.png", // Roadmap Sign
    offsetX: "-450px",
    offsetY: "-150px",
    rotate: "-20deg",
    depth: 2.1,
    zIndex: 30,
    width: 140
  },

  {
    src: "/Stickers/horse.png", // Horse
    offsetX: "-180px",
    offsetY: "350px",
    rotate: "-12deg",
    depth: 1.8,
    zIndex: 30,
    width: 150
  },
];

const IG_BADGES = [
  {
    handle: "@____its__arpit___",
    url: "https://www.instagram.com/____its__arpit___/",
    offsetX: "-320px",
    offsetY: "360px",
    rotate: "-6deg",
    depth: 1.4,
    zIndex: 25,
  },
  {
    handle: "@____its__arpit___",
    url: "https://www.instagram.com/____its__arpit___/",
    offsetX: "260px",
    offsetY: "-280px",
    rotate: "8deg",
    depth: 1.5,
    zIndex: 25,
  }
];


export const LifestyleSection = () => {
  // Center-anchored coordinate system
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Maps screen bounds (-500ish to 500ish essentially relative to center)
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full h-[150vh] md:h-[130vh] bg-[#030303] overflow-hidden flex flex-col border-t border-white/5 group">

      {/* Header */}
      <div className="relative z-50 px-6 md:px-16 pt-24 flex flex-col text-center md:text-left">
        <span className="text-accent text-sm font-mono tracking-widest font-bold uppercase mb-2">
          (LIFESTYLE)
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-[#EAEAEA]">
          Beyond<br />The Screen
        </h2>
      </div>

      {/* Container anchor - absolutely centering everything */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-0 h-0 flex items-center justify-center">

          {/* 1. RENDER POLAROIDS */}
          {PHOTOS.map((data) => {
            const parallaxX = useTransform(smoothX, (v) => (v * 0.05 * data.depth));
            const parallaxY = useTransform(smoothY, (v) => (v * 0.05 * data.depth));

            return (
              <div
                key={`photo-${data.id}`}
                className="absolute pointer-events-none drop-shadow-2xl"
                style={{
                  left: data.offsetX,
                  top: data.offsetY,
                  zIndex: data.zIndex,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div
                  className="w-[280px] h-[320px] md:w-[320px] md:h-[380px] rounded-[16px] bg-[#121212] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col"
                  style={{
                    rotate: data.rotate,
                    x: parallaxX,
                    y: parallaxY
                  }}
                >
                  <div className="relative w-full flex-grow rounded-[8px] overflow-hidden bg-black/50">
                    <Image src={data.src} fill alt="Lifestyle" className="object-cover opacity-90 transition-transform duration-700 ease-out hover:scale-110 pointer-events-auto" unoptimized />
                  </div>
                  {data.title && (
                    <div className="w-full text-center mt-3 mb-2 text-white/50 opacity-80 text-lg md:text-xl font-medium tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
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

            return (
              <div
                key={`badge-${i}`}
                className="absolute pointer-events-none transition-transform hover:scale-105"
                style={{
                  left: badge.offsetX,
                  top: badge.offsetY,
                  zIndex: badge.zIndex,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div
                  onClick={() => window.open(badge.url, '_blank')}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-2xl pointer-events-auto cursor-pointer"
                  style={{
                    rotate: badge.rotate,
                    x: parallaxX,
                    y: parallaxY
                  }}
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="text-white font-bold tracking-widest text-sm uppercase">
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

            return (
              <div
                key={`stick-${i}`}
                className="absolute pointer-events-none drop-shadow-2xl"
                style={{
                  left: stick.offsetX,
                  top: stick.offsetY,
                  zIndex: stick.zIndex,
                  transform: 'translate(-50%, -50%)',
                  width: stick.width
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
                  <Image src={stick.src} width={stick.width} height={stick.width} className="w-full h-auto object-contain" alt="Sticker" unoptimized />
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
              <div className="relative w-[340px] h-[120px] md:w-[500px] md:h-[180px] lg:w-[600px] lg:h-[220px]">
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
