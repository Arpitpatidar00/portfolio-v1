/* ─── Site Configuration ─────────────────────────────────────
 * Central config for all site-wide settings.
 * Update values here to propagate across the entire site.
 * ──────────────────────────────────────────────────────────── */

export const siteConfig = {
  name: "Arpit Patidar",
  shortName: "Arpit",
  title: "Arpit Patidar | Visual Developer",
  description:
    "A showcase of selected works and projects built by Arpit Patidar.",
  url: "https://arpitpatidar.com",
  locale: "en-US",
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
