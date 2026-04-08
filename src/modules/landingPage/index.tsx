"use client";
import { HeroSection } from "./hero-section";
import { IdentitySection } from "./identity-section";
import { WorkSection } from "./work-section";
import { ProjectSection } from "./project-section";
import { ExperienceSection } from "./experience-section";
import { LifestyleSection } from "./lifestyle-section";
import { SkillsSection } from "./skills-section";
import { ConnectSection } from "./connect-section";
import { Footer } from "./footer";

export const LandingPage = () => {

    return (
        <>
            <HeroSection />
            <IdentitySection />
            <WorkSection />
            <ProjectSection />
            <ExperienceSection />
            <LifestyleSection />
            <SkillsSection />
            <ConnectSection />
            <Footer />
        </>
    );
};
