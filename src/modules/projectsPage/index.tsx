"use client";

import { AppNavbar } from "@/layout/AppNavbar";
import { ZigZagTimeline } from "./zig-zag-timeline";

export const ProjectsPage = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#111] overflow-x-hidden flex flex-col font-sans text-foreground">
      <div className="w-full px-6 md:px-10 lg:px-16 pt-10 md:pt-12 pb-6">
        <AppNavbar />
      </div>
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 lg:px-16 py-16 md:py-32">
        <header className="text-center space-y-6 mb-32 md:mb-48">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight capitalize leading-tight">
            Built on Process,<br />
            <span className="text-white">Driven by Results.</span>
          </h1>
        </header>

        <ZigZagTimeline />
      </div>

    </main>
  );
};
