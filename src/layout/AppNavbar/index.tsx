"use client";

import React, { useEffect, useState } from "react";

export const AppNavbar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
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
        <span className="hover:text-accent transition-colors duration-300">HOME</span>
        <span className="hover:text-accent transition-colors duration-300">ABOUT</span>
        <span className="hover:text-accent transition-colors duration-300">PROJECTS</span>
        <span className="hover:text-accent transition-colors duration-300">CONTACT</span>

      </div>

      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-end">
          <span className="text-muted-foreground mb-1">Location / Time</span>
          <span className="text-foreground">India {time}</span>
        </div>
      </div>
    </nav>
  );
};
