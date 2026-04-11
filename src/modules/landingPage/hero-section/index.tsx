"use client";

import { AppNavbar } from "@/layout/AppNavbar";
import { AppConnect } from "@/components/AppConnect";
import Link from "next/link";
import { heroContent, routes } from "@/constants";

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] font-sans selection:bg-accent selection:text-background text-white">
      {/* 1px Structural Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grid-pattern"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      {/* Background Particle Face — MOBILE: full-coverage, centered */}
      <div
        className="absolute inset-0 z-0 pointer-events-none grayscale opacity-100 mix-blend-screen md:hidden"
        style={{
          backgroundImage: 'url(/bg/herobg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
        }}
      />

      {/* Background Particle Face — DESKTOP: right-anchored, contained */}
      <div
        className="absolute right-0 top-0 h-full z-0 pointer-events-none grayscale opacity-100 mix-blend-screen hidden md:block"
        style={{
          width: '65vw',
          backgroundImage: 'url(/bg/herobg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'right center',
          transform: 'translateX(10%)',
        }}
      />

      {/* Main Layout Container */}
      <div className="relative z-10 h-full w-full flex flex-col px-5 sm:px-6 md:px-10 lg:px-16 pt-6 md:pt-12 pb-6 md:pb-20">

        {/* Top Navbar Area */}
        <AppNavbar />

        {/* Middle Content Area */}
        <div className="flex-1 flex flex-col relative">

          {/* Grid Markers (+) */}
          <div className="absolute top-[35%] md:top-0 left-0 w-full flex">
            <div className="w-[10%] flex items-center justify-start">
              <span className="text-muted-foreground/30 text-sm md:text-lg lg:text-xl font-light">+</span>
            </div>
            <div className="flex-1 pl-[20%] md:pl-[15%] lg:pl-[15%] flex items-center justify-start">
              <span className="text-muted-foreground/30 text-sm md:text-lg lg:text-xl font-light">+</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row mt-auto md:mt-24 mb-4 md:mb-0">
            {/* Left Sidebar Links — Desktop only */}
            <div className="hidden md:flex md:flex-col md:gap-2 md:w-[10%] mt-0">
              <Link href={routes.projects} className="text-xs font-mono uppercase tracking-[0.4em] font-medium cursor-pointer hover:text-accent transition-colors">PROJECTS</Link>
              <Link href={routes.about} className="text-xs font-mono uppercase tracking-[0.4em] font-medium cursor-pointer hover:text-accent transition-colors">INFO</Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:pl-[15%] lg:pl-[15%] flex flex-col justify-end md:justify-start">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                <span className="text-[10px] sm:text-[11px] uppercase font-mono italic tracking-[0.6em] md:tracking-[0.8em] text-muted-foreground block font-medium opacity-70">
                  {heroContent.tagline}
                </span>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <h2 className="text-[2.25rem] flex flex-col sm:text-[3rem] md:text-4xl lg:text-6xl leading-[0.9] tracking-tight">
                    <span className="font-serif italic font-light block sm:inline mr-4">Visual</span>
                    <span className="font-heading font-black uppercase text-accent accent-glow block sm:inline">Developer</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-sans uppercase tracking-[0.3em] text-white/50 font-medium">
                    {heroContent.subline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <footer className="flex items-end justify-between w-full mt-auto">

          {/* AppConnect & Signature — Desktop only */}
          <div className="hidden md:flex flex-col gap-6">
            <div className="font-handwriting text-3xl text-accent/80 -rotate-6 ml-4">
              Arpit
            </div>
            <AppConnect />
          </div>

          {/* Massive Logo — always visible */}
          <div className="relative w-full md:w-auto">
            <h1 className="text-[22vw] sm:text-[16vw] md:text-[24vw] lg:text-[16vw] leading-[0.7] font-heading font-black tracking-[-0.08em] select-none text-white overflow-visible transition-all duration-700 md:text-right drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              Code
            </h1>
          </div>
        </footer>
      </div>
    </section>
  );
};
