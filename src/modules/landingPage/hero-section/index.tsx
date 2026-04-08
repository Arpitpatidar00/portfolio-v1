"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { AppNavbar } from "@/layout/AppNavbar";

export const HeroSection = () => {

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] font-sans selection:bg-accent selection:text-background text-white">
      {/* 1px Structural Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grid-pattern"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      {/* Background Particle Face */}
      <div
        className="absolute right-0 top-0 h-full z-0 pointer-events-none grayscale opacity-100 mix-blend-screen"
        style={{
          width: '60vw',
          backgroundImage: 'url(/bg/herobg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'right center',
          transform: 'translateX(15%)',
        }}
      />

      {/* Main Layout Container */}
      <div className="relative z-10 h-full w-full flex flex-col p-6 md:p-10 lg:p-12">

        {/* Top Navbar Area */}
        <AppNavbar />

        {/* Middle Content Area */}
        <div className="flex-1 flex flex-col relative">

          {/* Grid Markers (+) */}
          <div className="absolute top-0 left-0 w-full flex">
            <div className="w-[15%] lg:w-[10%] flex items-center justify-start">
              <span className="text-muted-foreground/30 text-lg lg:text-xl font-light transform translate-y-[-50%]">+</span>
            </div>
            <div className="flex-1 lg:pl-[15%] flex items-center justify-start">
              <span className="text-muted-foreground/30 text-lg lg:text-xl font-light transform translate-y-[-50%]">+</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row mt-12 lg:mt-24">
            {/* Left Sidebar Links */}
            <div className="w-[15%] lg:w-[10%] flex flex-col gap-1 lg:gap-2 mt-4 lg:mt-0">
              <span className="text-[11px] lg:text-xs font-mono uppercase tracking-[0.4em] font-medium cursor-pointer hover:text-accent transition-colors">PROJECTS</span>
              <span className="text-[11px] lg:text-xs font-mono uppercase tracking-[0.4em] font-medium cursor-pointer hover:text-accent transition-colors">INFO</span>
            </div>

            {/* Main Center-Right Content */}
            <div className="flex-1 lg:pl-[15%] mt-16 lg:mt-0">
              <div className="space-y-6 lg:space-y-8 max-w-2xl">
                <span className="text-[10px] lg:text-[11px] uppercase font-mono tracking-[0.5em] text-muted-foreground block font-medium">
                  Output
                </span>
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1] tracking-tight font-light">
                    Visual Developer
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl font-sans tracking-wide text-white/90 font-light">
                    Digital products and systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <footer className="flex items-end justify-between w-full h-[30vh]">
          {/* Connect Link */}
          <div className="flex items-center gap-3 lg:gap-4 cursor-pointer group pb-4 lg:pb-8">
            <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-accent transition-colors transform translate-y-[2px]" />
            <span className="text-[11px] lg:text-xs font-mono tracking-[0.4em] uppercase font-medium group-hover:text-accent transition-colors">Connect</span>
          </div>

          {/* Massive Logo */}
          <div className="relative">
            <h1 className="text-[25vw] lg:text-[22vw] leading-[0.7] font-sans font-bold tracking-[-0.05em] select-none text-white overflow-visible transition-all duration-700">
              Code
            </h1>
          </div>
        </footer>
      </div>
    </section>
  );
};

