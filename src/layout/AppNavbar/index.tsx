"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/constants";

export const AppNavbar = () => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();

      // This calculates the exact time in India regardless of the local machine's timezone
      const indiaTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (330 * 60000));

      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      // We use 'en-GB' to ensure a clean 24h/12h format without extra commas
      setTime(new Intl.DateTimeFormat("en-US", options).format(indiaTime));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="flex justify-between items-start w-full text-xs font-mono uppercase tracking-[0.3em] relative z-20">
      <div className="flex gap-6 group cursor-pointer ">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-accent transition-colors duration-300 pointer-events-auto">{link.label}</Link>
        ))}
      </div>

      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-end">
          <span className="text-muted-foreground mb-1">Location / Time</span>
          <span className="text-foreground">{siteConfig.location} {mounted ? time : "—"}</span>
        </div>
      </div>
    </nav>
  );
};
