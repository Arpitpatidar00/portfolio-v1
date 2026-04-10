"use client";
import { HeroSection } from "./hero-section";
import { IdentitySection } from "./identity-section";
import { WorkSection } from "./work-section";
import { ProjectSection } from "./project-section";
import { ExperienceSection } from "./experience-section";
import { LifestyleSection } from "./lifestyle-section";
import { SkillsSection } from "./skills-section";

export const LandingPage = () => {

    return (
        <div className="flex flex-col gap-16 md:gap-24 lg:gap-32 bg-background">
            <HeroSection />
            <IdentitySection />
            <WorkSection />
            <LifestyleSection />
            <ProjectSection />
            <ExperienceSection />
            <SkillsSection />
        </div>
    );
};
