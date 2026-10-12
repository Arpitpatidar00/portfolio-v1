import type { ImageLoaderProps } from "next/image";
import { cloudinaryImage } from "./cloudinary";

/**
 * Global next/image loader (see `images.loaderFile` in next.config.ts).
 * Every <Image> gets a responsive srcset served straight from Cloudinary,
 * so images never pass through the Next.js server.
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  if (/^https?:\/\//.test(src)) return src;
  return cloudinaryImage(src, { width, quality });
}
