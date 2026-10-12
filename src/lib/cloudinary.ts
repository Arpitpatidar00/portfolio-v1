/* ─── Cloudinary ─────────────────────────────────────────────
 * All media (images, audio) is served from Cloudinary's CDN.
 * Source files live in /assets and are uploaded with
 * `yarn assets:upload`; code keeps referring to them by their
 * original path (e.g. "/personal/image3.jpeg").
 *
 * Kept dependency-free (no "@/..." imports, erasable TS only) so
 * scripts/upload-to-cloudinary.ts can import it with plain Node.
 * ──────────────────────────────────────────────────────────── */

// Written by the upload script: public ID -> Cloudinary version.
import versions from "./cloudinary-versions.json" with { type: "json" };

/** The cloud name is public (it is part of every delivery URL). */
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "druv4ubsv";

export const CLOUDINARY_ORIGIN = "https://res.cloudinary.com";

const ROOT_FOLDER = "portfolio";
const BASE_URL = `${CLOUDINARY_ORIGIN}/${CLOUDINARY_CLOUD_NAME}`;

/** Background music is re-encoded on the CDN; 128 kbps cuts the file by ~60%. */
const AUDIO_BITRATE = "128k";

export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif", "gif", "svg"];
export const AUDIO_EXTENSIONS = ["mp3", "m4a", "ogg", "wav"];

const extensionOf = (assetPath: string) =>
  assetPath.split("?", 1)[0].split(".").pop()?.toLowerCase() ?? "";

/**
 * Maps an asset path to its Cloudinary public ID.
 * "/bg/Background image@2x.png" -> "portfolio/bg/background-image-2x"
 */
export const toPublicId = (assetPath: string) =>
  `${ROOT_FOLDER}/${assetPath
    .replace(/^\/+/, "")
    .replace(/\.[^./]+$/, "")
    .replace(/[\s@]+/g, "-")
    .toLowerCase()}`;

/**
 * "portfolio/self" -> "v1791828476/portfolio/self". The version changes on every
 * re-upload, so URLs can be cached as immutable without ever going stale.
 */
const versioned = (publicId: string) => {
  const version = (versions as Record<string, number>)[publicId];
  return version ? `v${version}/${publicId}` : publicId;
};

type ImageOptions = {
  /** Target width in px. Cloudinary only ever scales down (c_limit). */
  width?: number;
  /** 1–100; defaults to q_auto, which picks the smallest visually lossless file. */
  quality?: number;
};

/**
 * CDN URL for an image. f_auto serves the smallest format each browser supports (WebP/AVIF).
 * SVGs are returned untouched so they stay vector.
 */
export const cloudinaryImage = (assetPath: string, { width, quality }: ImageOptions = {}) => {
  const publicId = toPublicId(assetPath);
  if (extensionOf(assetPath) === "svg") return `${BASE_URL}/image/upload/${versioned(publicId)}.svg`;

  const transforms = ["f_auto", quality ? `q_${quality}` : "q_auto", width && `w_${width},c_limit`]
    .filter(Boolean)
    .join(",");
  return `${BASE_URL}/image/upload/${transforms}/${versioned(publicId)}`;
};

/** CDN URL for an audio file (Cloudinary stores audio as the "video" resource type). */
export const cloudinaryAudio = (assetPath: string) =>
  `${BASE_URL}/video/upload/br_${AUDIO_BITRATE}/${versioned(toPublicId(assetPath))}.mp3`;
