"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const IdentitySection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden selection:bg-accent selection:text-background z-10 bg-background px-6 md:px-10 lg:px-16 py-16 md:py-20">

      {/* Structural Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grid-pattern" />

      {/* Massive Background Typography */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none whitespace-nowrap opacity-100 flex items-center justify-center">
        <h2 className="text-[25vw] leading-none font-heading font-black uppercase tracking-tighter text-[#EAEAEA] mix-blend-overlay">
          / ARPIT PATIDAR
        </h2>
      </div>

      {/* Floating Orange Texts */}
      <div className="absolute top-1/3 left-8 md:left-24 z-20 pointer-events-none hidden lg:block">
        <p className="text-accent text-xs md:text-sm font-mono tracking-[0.1em] font-bold uppercase drop-shadow-md">
          (HELLO! I&apos;M ARPIT)
        </p>
      </div>

      <div className="absolute bottom-[40%] right-8 md:right-24 z-20 pointer-events-none hidden lg:block">
        <p className="text-accent text-xs md:text-sm font-mono tracking-[0.1em] font-bold uppercase text-right max-w-[200px] md:max-w-xs leading-relaxed drop-shadow-md">
          I HAIL FROM THE HEART(MP) &<br />I LOVE KACHORI&apos;S!
        </p>
      </div>

      {/* Center ID Card */}
      <div className="relative z-30 w-[300px] md:w-[350px] h-[460px] md:h-[520px] bg-[#212121] rounded-[24px] shadow-[0_40px_80px_-10px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/10 px-[10px] pb-[10px] pt-[32px] flex flex-col group transition-transform duration-700 hover:-translate-y-2 hover:rotate-1">

        {/* Lanyard Strap Base (the loop around the plastic) */}
        <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-[46px] h-[40px] bg-[#1a1a1a] rounded-xl z-0 shadow-[0_5px_10px_rgba(0,0,0,0.5)] border border-white/5" />

        {/* Lanyard Strap (going up infinitely) */}
        <div className="absolute bottom-[496px] md:bottom-[556px] left-1/2 -translate-x-1/2 w-[40px] h-[1000px] bg-[#1a1a1a] z-0 shadow-[-5px_0_15px_rgba(0,0,0,0.3)] border-l border-r border-[#222]" />

        {/* Lanyard Hole cutout (visually empty hole punching through) */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[52px] h-[12px] bg-background rounded-full shadow-[inset_0_4px_6px_rgba(0,0,0,0.8)] z-40 border-b border-white/10" />

        {/* The Inner Card Background */}
        <div className="relative w-full h-full bg-accent rounded-[14px] overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)]">

          {/* Top Right Shape (Portfolio) overlaying the orange */}
          <div className="absolute top-0 right-0 w-[110px] h-[36px] bg-[#212121] rounded-bl-[14px] flex items-center justify-center z-20 shadow-[-4px_4px_8px_rgba(0,0,0,0.15)]">
            <span className="text-[9px] font-bold text-white/80 uppercase tracking-wider">(PORTFOLIO)</span>
          </div>
          {/* Smooth Inverted Corners for Portfolio Tab */}
          <div className="absolute top-0 right-[110px] w-3 h-3 z-20" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 11.5px, #212121 12px)' }} />
          <div className="absolute top-[36px] right-0 w-3 h-3 z-20" style={{ background: 'radial-gradient(circle at 0% 100%, transparent 11.5px, #212121 12px)' }} />

          {/* Bottom Shape (Copyright) overlying the inner box */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[24px] bg-[#212121] rounded-t-[10px] flex items-center justify-center z-30 shadow-[0_-4px_8px_rgba(0,0,0,0.15)]">
            <span className="text-[7.5px] font-bold tracking-widest uppercase text-white/50">
              ©2026, Skills not replaced by AI (YET)
            </span>
          </div>
          {/* Smooth Inverted Corners for Copyright Tab */}
          <div className="absolute bottom-0 right-[calc(50%+110px)] w-3 h-3 z-30" style={{ background: 'radial-gradient(circle at 0% 0%, transparent 11.5px, #212121 12px)' }} />
          <div className="absolute bottom-0 left-[calc(50%+110px)] w-3 h-3 z-30" style={{ background: 'radial-gradient(circle at 100% 0%, transparent 11.5px, #212121 12px)' }} />

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

          {/* Bottom Vignette/Fade (Mimics dark jacket overlaying text background) */}
          <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent z-10 pointer-events-none" />

          {/* Text overlays inside Card */}
          <div className="absolute bottom-[44px] left-[10%] z-20">
            <span className="text-[13px] font-bold tracking-wider text-white">ARCHITECTURE</span>
            <h3 className="text-[3.2rem] font-black uppercase leading-[0.8] tracking-tighter text-white mt-1">
              Systems<br />Engineer
            </h3>
          </div>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="absolute bottom-12 md:bottom-16 w-full flex justify-between items-end px-6 md:px-10 lg:px-16 z-20 font-mono text-muted-foreground uppercase text-xs tracking-widest pointer-events-none">

        {/* Left '01' indicator */}
        <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/10 pointer-events-auto cursor-pointer hover:bg-white/5 transition-colors shadow-lg">
          01
        </div>

        {/* Center Scroll Arrow */}
        <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/10 pointer-events-auto cursor-pointer hover:bg-white/5 transition-colors group shadow-lg">
          <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
        </div>

        {/* Right Level Text */}
        <div className="text-right flex flex-col gap-1 drop-shadow-md">
          <span className="text-[9px] md:text-[10px] text-muted-foreground/60 leading-none">Leveled up to:</span>
          <span className="text-white font-black tracking-tight text-sm md:text-base leading-none"> .01% of developers</span>
        </div>

      </div>
    </section>
  );
};
