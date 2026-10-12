/* ─── Site Configuration ─────────────────────────────────────
 * Central config for all site-wide settings.
 * Update values here to propagate across the entire site.
 * ──────────────────────────────────────────────────────────── */

export const siteConfig = {
  name: "Arpit Patidar",
  shortName: "Arpit",
  jobTitle: "Full-Stack & Web3 Developer",
  title: "Arpit Patidar — Full-Stack & Web3 Developer (Next.js, Node.js)",
  description:
    "Arpit Patidar, full-stack & Web3 developer in India. I build Next.js, Node.js and TypeScript apps: cross-chain payments, stablecoins, SaaS and e-commerce.",
  /*
   * The public URL is NOT hard-coded here. Set NEXT_PUBLIC_SITE_URL in your
   * hosting environment (see src/lib/seo.ts). The previous value,
   * https://arpitpatidar.com, is a different person's website.
   */
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "MongoDB",
    "Supabase",
    "Web3",
    "Stablecoin payments",
    "Cross-chain payments",
    "Full-stack development",
  ],
  locale: "en_IN",
  timezone: "Asia/Kolkata",
  location: "India",
};

export const socialLinks = {
  github: "https://github.com/Arpitpatidar00",
  linkedin: "https://www.linkedin.com/in/arpit-patidar-05b413232/",
  twitter: "https://x.com/devArpit0",
  instagram: {
    url: "https://www.instagram.com/____its__arpit___/",
    handle: "@____its__arpit___",
  },
  email: "arpitpatidarappi01@gmail.com",
};

export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const routes = {
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
} as const;
