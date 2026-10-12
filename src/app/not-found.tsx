import type { Metadata } from "next";
import Link from "next/link";
import { navLinks } from "@/constants";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Real 404 (status code 404), styled like the rest of the site, with links back in. */
export default function NotFound() {
  return (
    <main className="min-h-[70vh] w-full bg-[#050505] text-white flex flex-col items-center justify-center gap-10 px-6 py-24 text-center">
      <span className="text-accent text-xs font-mono tracking-[0.4em] font-bold uppercase">(404)</span>
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black uppercase tracking-tighter">
        Lost in<br />the grid
      </h1>
      <p className="max-w-md text-sm sm:text-base text-white/50">
        This page doesn&apos;t exist or has moved. Try one of these instead:
      </p>
      <nav aria-label="Site pages" className="flex flex-wrap justify-center gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white/70 hover:text-white text-[10px] font-mono tracking-[0.2em] font-bold uppercase transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
