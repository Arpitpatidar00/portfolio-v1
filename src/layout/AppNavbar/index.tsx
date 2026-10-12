"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/constants";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: siteConfig.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const subscribeToClock = (onTick: () => void) => {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
};
const getLocalTime = () => timeFormatter.format(new Date());
// The server can't know the visitor's render time, so it renders a placeholder.
const getServerTime = () => "—";

export const AppNavbar = () => {
  const time = useSyncExternalStore(subscribeToClock, getLocalTime, getServerTime);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav aria-label="Main" className="hidden md:flex justify-between items-start w-full text-xs font-mono uppercase tracking-[0.3em] relative z-20">
        <div className="flex gap-6 group cursor-pointer items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent transition-colors duration-300 pointer-events-auto">{link.label}</Link>
          ))}
          <a
            href="/resume/resume.pdf"
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 text-accent transition-all duration-300 pointer-events-auto"
          >
            <Download size={10} strokeWidth={2.5} />
            <span>Resume</span>
          </a>
        </div>
        <div className="flex gap-12 items-center">
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground mb-1">Location / Time</span>
            <span className="text-foreground">{siteConfig.location} {time}</span>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Navbar ─── */}
      <nav className="flex md:hidden justify-between items-center w-full relative z-50">
        {/* Left: Location + Time */}
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]">
          <span className="text-foreground">{siteConfig.location}</span>
          <span className="text-muted-foreground">{time}</span>
        </div>

        {/* Right: Menu Button */}
        <button
          type="button"
          aria-expanded={menuOpen}
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
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
              >
                <a
                  href="/resume/resume.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-4xl font-heading font-black uppercase tracking-tight text-accent hover:text-white transition-colors duration-300"
                >
                  <Download size={28} strokeWidth={2.5} />
                  Resume
                </a>
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="px-8 pb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{siteConfig.location} · {time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
