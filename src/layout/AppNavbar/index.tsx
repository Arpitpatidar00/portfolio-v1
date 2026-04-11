"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/constants";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AppNavbar = () => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const indiaTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (330 * 60000));
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(indiaTime));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <nav className="hidden md:flex justify-between items-start w-full text-xs font-mono uppercase tracking-[0.3em] relative z-20">
        <div className="flex gap-6 group cursor-pointer">
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

      {/* ─── Mobile Navbar ─── */}
      <nav className="flex md:hidden justify-between items-center w-full relative z-50">
        {/* Left: Location + Time */}
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]">
          <span className="text-foreground">{siteConfig.location}</span>
          <span className="text-muted-foreground">{mounted ? time : "—"}</span>
        </div>

        {/* Right: Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
        >
          <Menu size={14} strokeWidth={2.5} />
          <span>Menu</span>
        </button>
      </nav>

      {/* ─── Mobile Fullscreen Menu Overlay ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#050505]/98 backdrop-blur-xl flex flex-col"
          >
            {/* Close Button */}
            <div className="flex justify-end px-4 pt-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                <X size={14} strokeWidth={2.5} />
                <span>Close</span>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col items-start justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-heading font-black uppercase tracking-tight text-white hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Info */}
            <div className="px-8 pb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{siteConfig.location} · {mounted ? time : "—"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
