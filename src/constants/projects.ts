/* ─── Projects ───────────────────────────────────────────────
 * Shared by the /projects timeline (UI) and its JSON-LD (SEO).
 * Plain data module (no "use client") so Server Components can read it.
 * ──────────────────────────────────────────────────────────── */

export interface Project {
  id: string;
  year: string;
  category: string;
  title: string;
  src: string;
  rotation: string;
  link: string;
}

export const PROJECTS: Project[] = [
  { id: "01", year: "2024", category: "WEB APP", title: "7wovs Wedding", src: "/selected-work/7wovs.png", rotation: "rotate-[-2deg]", link: "https://7vowswed.com" },
  { id: "02", year: "2024", category: "WEB APP", title: "EasyMB", src: "/selected-work/easymb.png", rotation: "rotate-[-2deg]", link: "https://easymb.in" },
  { id: "03", year: "2024-25", category: "E-COMMERCE", title: "Ubuntu Interior", src: "/selected-work/ubuntu.png", rotation: "rotate-[-1deg]", link: "http://ubuntuinterior.com" },
  { id: "04", year: "2025", category: "CRM", title: "Acent Tech", src: "", rotation: "rotate-[4deg]", link: "" },
  { id: "05", year: "2025", category: "SaaS", title: "Vireo Setup", src: "/selected-work/vireo.png", rotation: "rotate-[4deg]", link: "https://dev.vireo.me" },
  { id: "06", year: "2025-26", category: "DEFI", title: "Stable Coin", src: "/selected-work/stable.png", rotation: "rotate-[2deg]", link: "https://stablecoinpay.io" },
  { id: "07", year: "2025-26", category: "DEFI", title: "Stable Link", src: "/selected-work/stable-link.png", rotation: "rotate-[2deg]", link: "http://stables.link" },
  { id: "08", year: "2025-26", category: "PLATFORM", title: "Intent Flow", src: "/selected-work/intent.png", rotation: "rotate-[3deg]", link: "http://intentswap.io" },
  { id: "09", year: "2025-26", category: "WEB3", title: "Metasub App", src: "/selected-work/metasub.png", rotation: "rotate-[-3deg]", link: "https://metasub.xyz" },
  { id: "10", year: "2025-26", category: "WEB3 ACADEMY", title: "Adventure Dao", src: "/selected-work/adventure.png", rotation: "rotate-[-3deg]", link: "https://adventuredao.com" },
];
