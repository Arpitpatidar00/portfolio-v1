"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const IdentitySection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden selection:bg-accent selection:text-background z-10 bg-background px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20">

      {/* Structural Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grid-pattern" />

      {/* Massive Background Typography — slides in from left */}
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none whitespace-nowrap opacity-100 flex items-center justify-center"
      >
        <h2 className="text-[15vw] sm:text-[20vw] md:text-[25vw] leading-none font-heading font-black uppercase tracking-tighter text-[#EAEAEA] mix-blend-overlay">
          / ARPIT PATIDAR
        </h2>
      </motion.div>

      {/* Floating Orange Texts — fade + slide in */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="absolute top-1/3 left-4 sm:left-8 md:left-24 z-20 pointer-events-none hidden md:block"
      >
        <p className="text-accent text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.1em] font-bold uppercase drop-shadow-md">
          (HELLO! I&apos;M ARPIT)
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="absolute bottom-[40%] right-4 sm:right-8 md:right-24 z-20 pointer-events-none hidden md:block"
      >
        <p className="text-accent text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.1em] font-bold uppercase text-right max-w-[180px] sm:max-w-[200px] md:max-w-xs leading-relaxed drop-shadow-md">
          I HAIL FROM THE HEART(MP) &<br />I LOVE KACHORI&apos;S!
        </p>
      </motion.div>

      {/* Center ID Card — scales in with spring + continuous gentle float */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-30"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[210px] sm:w-[260px] md:w-[350px] h-[330px] sm:h-[400px] md:h-[520px] bg-[#212121] rounded-[18px] sm:rounded-[22px] md:rounded-[24px] shadow-[0_40px_80px_-10px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/10 px-[6px] sm:px-[8px] md:px-[10px] pb-[6px] sm:pb-[8px] md:pb-[10px] pt-[24px] sm:pt-[28px] md:pt-[32px] flex flex-col group relative"
        >

          {/* Lanyard Strap Base */}
          <div className="absolute -top-[10px] sm:-top-[12px] left-1/2 -translate-x-1/2 w-[34px] sm:w-[40px] md:w-[46px] h-[32px] sm:h-[36px] md:h-[40px] bg-[#1a1a1a] rounded-xl z-0 shadow-[0_5px_10px_rgba(0,0,0,0.5)] border border-white/5" />

          {/* Lanyard Strap */}
          <div className="absolute bottom-[356px] sm:bottom-[432px] md:bottom-[556px] left-1/2 -translate-x-1/2 w-[28px] sm:w-[34px] md:w-[40px] h-[1000px] bg-[#1a1a1a] z-0 shadow-[-5px_0_15px_rgba(0,0,0,0.3)] border-l border-r border-[#222]" />

          {/* Lanyard Hole cutout */}
          <div className="absolute top-[6px] sm:top-[8px] md:top-[10px] left-1/2 -translate-x-1/2 w-[38px] sm:w-[46px] md:w-[52px] h-[9px] sm:h-[10px] md:h-[12px] bg-background rounded-full shadow-[inset_0_4px_6px_rgba(0,0,0,0.8)] z-40 border-b border-white/10" />

          {/* The Inner Card Background */}
          <div className="relative w-full h-full bg-accent rounded-[10px] sm:rounded-[12px] md:rounded-[14px] overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)]">

            {/* Top Right Shape (Portfolio) */}
            <div className="absolute top-0 right-0 w-[76px] sm:w-[90px] md:w-[110px] h-[26px] sm:h-[30px] md:h-[36px] bg-[#212121] rounded-bl-[10px] sm:rounded-bl-[12px] md:rounded-bl-[14px] flex items-center justify-center z-20 shadow-[-4px_4px_8px_rgba(0,0,0,0.15)]">
              <span className="text-[7px] sm:text-[8px] md:text-[9px] font-bold text-white/80 uppercase tracking-wider">(PORTFOLIO)</span>
            </div>
            {/* Smooth Inverted Corners for Portfolio Tab */}
            <div className="absolute top-0 right-[76px] sm:right-[90px] md:right-[110px] w-2.5 sm:w-3 h-2.5 sm:h-3 z-20" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 9.5px, #212121 10px)' }} />
            <div className="absolute top-[26px] sm:top-[30px] md:top-[36px] right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 z-20" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 9.5px, #212121 10px)' }} />

            {/* Bottom Shape (Copyright) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150px] sm:w-[180px] md:w-[220px] h-[20px] sm:h-[22px] md:h-[24px] bg-[#212121] rounded-t-[7px] sm:rounded-t-[8px] md:rounded-t-[10px] flex items-center justify-center z-30 shadow-[0_-4px_8px_rgba(0,0,0,0.15)]">
              <span className="text-[5px] sm:text-[6px] md:text-[7.5px] font-bold tracking-widest uppercase text-white/50">
                ©2026, Skills not replaced by AI (YET)
              </span>
            </div>
            {/* Smooth Inverted Corners for Copyright Tab */}
            <div className="absolute bottom-0 right-[calc(50%+75px)] sm:right-[calc(50%+90px)] md:right-[calc(50%+110px)] w-2.5 sm:w-3 h-2.5 sm:h-3 z-30" style={{ background: 'radial-gradient(circle at 0% 0%, transparent 9.5px, #212121 10px)' }} />
            <div className="absolute bottom-0 left-[calc(50%+75px)] sm:left-[calc(50%+90px)] md:left-[calc(50%+110px)] w-2.5 sm:w-3 h-2.5 sm:h-3 z-30" style={{ background: 'radial-gradient(circle at 100% 0%, transparent 9.5px, #212121 10px)' }} />

            {/* Portrait Image */}
            <div className="absolute inset-0 z-10 w-[140%] h-[120%] -ml-[20%] mt-[5%] pointer-events-none">
              <Image
                src="/self.png"
                alt="Portrait"
                fill
                className="object-cover grayscale contrast-[1.15] opacity-90 mix-blend-multiply"
                unoptimized
              />
            </div>

            {/* Bottom Vignette/Fade */}
            <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent z-10 pointer-events-none" />

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 z-[15] pointer-events-none rounded-[10px] sm:rounded-[12px] md:rounded-[14px]"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,107,0,0.08), transparent 70%)' }}
            />

            {/* Text overlays inside Card — staggered entry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute bottom-[24px] sm:bottom-[32px] md:bottom-[44px] left-[8%] sm:left-[10%] z-20"
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-[8px] sm:text-[10px] md:text-[13px] font-bold tracking-wider text-white block"
              >
                ARCHITECTURE
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                viewport={{ once: true }}
                className="text-[1.3rem] sm:text-[1.8rem] md:text-[2.4rem] lg:text-[3.2rem] font-black uppercase leading-[0.8] tracking-tighter text-white mt-1"
              >
                Systems<br />Engineer
              </motion.h3>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Footer Details — slide-up animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-6 sm:bottom-10 md:bottom-16 w-full flex justify-between items-end px-4 sm:px-6 md:px-10 lg:px-16 z-20 font-mono text-muted-foreground uppercase text-[10px] sm:text-xs tracking-widest pointer-events-none"
      >
        {/* Left '01' indicator */}
        <motion.div
          whileHover={{ scale: 1.1, borderColor: "rgba(255,107,0,0.5)" }}
          className="flex items-center justify-center w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full border border-white/10 pointer-events-auto cursor-pointer hover:bg-white/5 transition-colors shadow-lg text-[10px] sm:text-xs"
        >
          01
        </motion.div>

        {/* Center Scroll Arrow — bouncing pulse */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15, borderColor: "rgba(255,107,0,0.5)" }}
          className="flex items-center justify-center w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full border border-white/10 pointer-events-auto cursor-pointer hover:bg-white/5 transition-colors shadow-lg"
        >
          <ArrowDown size={14} className="sm:w-4 sm:h-4" />
        </motion.div>

        {/* Right Level Text */}
        <div className="text-right flex flex-col gap-1 drop-shadow-md">
          <span className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground/60 leading-none">Leveled up to:</span>
          <span className="text-white font-black tracking-tight text-xs sm:text-sm md:text-base leading-none"> .01% of developers</span>
        </div>

      </motion.div>
    </section>
  );
};
