"use client";
import { AppNavbar } from "@/layout/AppNavbar";
import { HeroSection } from "./hero-section";
import { ResumeSection } from "./resume-section";

export const AboutPage = () => {
  return (
    <main className="relative min-h-screen w-full bg-background overflow-x-hidden flex flex-col font-sans text-foreground">
      {/* Navbar Container */}
      <div className="w-full px-6 md:px-10 lg:px-16 pt-10 md:pt-12 pb-6">
        <AppNavbar />
      </div>

      <HeroSection />
      <ResumeSection />
    </main>
  );
};