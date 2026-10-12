/* ─── Media ──────────────────────────────────────────────────
 * Cloudinary URLs for assets used outside <Image> (CSS backgrounds,
 * preloads, structured data). Plain module so Server Components can read it.
 * ──────────────────────────────────────────────────────────── */

import { cloudinaryImage } from "@/lib/cloudinary";

/** Hero "particle face" (760×692): small enough to always serve at full size. */
export const HERO_BG_URL = cloudinaryImage("/bg/herobg.webp");

/** Portrait used in structured data (Google shows it in knowledge panels). */
export const PORTRAIT_URL = cloudinaryImage("/self1.jpeg");
