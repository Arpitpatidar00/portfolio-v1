"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AppNavbar } from "@/layout/AppNavbar";

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FF5E41] selection:text-white relative overflow-hidden flex flex-col px-6 md:px-10 lg:px-16">
      {/* Navbar Wrapper */}
      <div className="w-full pt-10 md:pt-12 pb-6">
        <AppNavbar />
      </div>

      <main className="flex-1 flex flex-col relative py-20">
        {/* Handwriting Typography & Images Moodboard Section */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/8] flex flex-col items-center justify-center mb-24">

          {/* Scatter Images (Absolute Positioned placeholder polaroids) */}

          {/* Top Left - Leaves */}
          <motion.div
            initial={{ opacity: 0, rotate: -5, y: 20 }}
            animate={{ opacity: 1, rotate: -1.5, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute top-[5%] left-[5%] w-[180px] h-[180px] md:w-[260px] md:h-[260px] bg-white/5 p-3 shadow-2xl z-10 desk-scatter-2 backdrop-blur-sm border border-white/10"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/personal/image7.jpeg"
                alt="Texture"
                fill
                className="object-cover opacity-80 contrast-125"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Top Right - Sitting Person */}
          <motion.div
            initial={{ opacity: 0, rotate: 5, y: 20 }}
            animate={{ opacity: 1, rotate: 2, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute top-[0%] right-[5%] w-[150px] h-[150px] md:w-[220px] md:h-[220px] bg-white/5 p-2 shadow-2xl z-5 desk-scatter-3 backdrop-blur-sm border border-white/10"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/personal/image18.jpeg"
                alt="Atmosphere"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Center Background - Standing Person (Larger) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 1 }}
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[250px] h-[300px] md:w-[400px] md:h-[480px] bg-white/5 p-4 shadow-[0_0_100px_rgba(255,255,255,0.05)] z-0 backdrop-blur-md border border-white/10"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/personal/image8.jpeg"

                alt="Main Character"
                fill
                className="object-cover grayscale opacity-60"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Bottom Left - Sitting Small */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, x: -20 }}
            animate={{ opacity: 1, rotate: -3, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-[5%] left-[10%] w-[120px] h-[150px] md:w-[180px] md:h-[220px] bg-white/5 p-2 shadow-xl z-10 desk-scatter-4 backdrop-blur-sm border border-white/10"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/personal/image19.jpeg"
                alt="Self"
                fill
                className="object-cover contrast-110"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Bottom Right - Close up Flowers */}
          <motion.div
            initial={{ opacity: 0, rotate: 10, x: 20 }}
            animate={{ opacity: 1, rotate: 4, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-[20%] right-[10%] w-[140px] h-[140px] md:w-[200px] md:h-[200px] bg-white/5 p-2 shadow-xl z-10 desk-scatter-5 backdrop-blur-sm border border-white/10"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/personal/image14.jpeg"
                alt="Details"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* GIANT HANDWRITING TEXT OVERLAP */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            className="relative z-20 text-[18vw] md:text-[14vw] leading-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] select-none text-white/90 whitespace-nowrap font-normal tracking-normal"
            style={{ fontFamily: "var(--font-handwriting)", textTransform: "none" }}
          >
            Contact me!
          </motion.h1>
        </div>

        {/* Form and CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full max-w-7xl mx-auto pt-20 border-t border-white/10">

          {/* Left side: Minimal Form */}
          <div className="space-y-12">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <textarea
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-white/30 text-white"
                />
              </div>

              {/* Submit Button with Custom Graphics */}
              <div className="pt-8 relative group w-fit">
                <button className="text-[14px] font-mono font-bold uppercase tracking-[0.3em] px-12 py-4 relative z-10 hover:text-black  transition-colors duration-300">
                  SUBMIT
                </button>
                {/* Messy Oval Hand-drawn SVG */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[180px] h-[70px] pointer-events-none transition-all duration-300 group-hover:scale-105 group-hover:rotate-1" viewBox="0 0 180 70">
                  <path
                    d="M10,35 C10,15 30,8 90,8 C150,8 170,15 170,35 C170,55 150,62 90,62 C30,62 10,55 10,35"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    className="group-hover:fill-white transition-all duration-300"
                  />
                  <path
                    d="M20,40 C20,20 40,12 95,12 C140,12 165,20 165,40 C165,55 145,58 95,58 C45,58 20,55 20,40"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.8"
                    strokeDasharray="4 2"
                    className="opacity-20"
                  />
                </svg>

                {/* Hand-drawn Arrow SVG */}
                <div className="absolute left-[calc(100%+30px)] top-1/2 -translate-y-1/2 hidden md:block">
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="transition-transform duration-500 group-hover:translate-x-3">
                    <path
                      d="M10,20 C20,5 70,5 110,20"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="opacity-60"
                    />
                    <path
                      d="M105,12 L115,20 L105,28"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {/* Right side: Bold Copy */}
          <div className="flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black leading-[0.9] text-accent">
                LET'S CREATE<br />
                THE IMPOSSIBLE —<br />
                TOGETHER
              </h2>

              <div className="max-w-md space-y-6">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed text-white/50">
                  LEGENDARIUM IS MORE THAN A MAGAZINE — IT'S A NEXUS FOR VISIONARIES, DISRUPTORS, AND PHENOMENA-IN-THE-MAKING. WHETHER YOU'RE READY TO BE FEATURED, CONTRIBUTE YOUR GENIUS, OR EXPLORE PARTNERSHIP OPPORTUNITIES, THIS IS WHERE THE CONVERSATION BEGINS.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
