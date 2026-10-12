/* ─── Upload /assets to Cloudinary ───────────────────────────
 * Mirrors every image and audio file in /assets to Cloudinary,
 * using the same public IDs the app requests (src/lib/cloudinary.ts).
 *
 *   yarn assets:upload            # upload everything (overwrites)
 *   yarn assets:upload personal   # only files under assets/personal
 *
 * Requires Node 22.18+ (runs TypeScript natively) and, in .env.local:
 *   CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * ──────────────────────────────────────────────────────────── */

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  AUDIO_EXTENSIONS,
  CLOUDINARY_CLOUD_NAME,
  IMAGE_EXTENSIONS,
  toPublicId,
} from "../src/lib/cloudinary.ts";

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET (see .env.example).");
  process.exit(1);
}

const ASSETS_DIR = path.resolve("assets");
// Versions make delivery URLs change whenever a file is re-uploaded (cache busting).
const VERSIONS_FILE = path.resolve("src/lib/cloudinary-versions.json");
const CONCURRENCY = 6;
// When two files map to the same public ID (herobg.png + herobg.webp), keep the most modern one.
const FORMAT_PRIORITY = ["avif", "webp", "svg", "png", "jpeg", "jpg", "gif"];

type Asset = { file: string; relPath: string; publicId: string; resourceType: "image" | "video" };

const extensionOf = (file: string) => path.extname(file).slice(1).toLowerCase();

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function collectAssets(filter?: string): Promise<Asset[]> {
  const byId = new Map<string, Asset>();

  for await (const file of walk(ASSETS_DIR)) {
    const relPath = path.relative(ASSETS_DIR, file).split(path.sep).join("/");
    if (filter && !relPath.startsWith(filter)) continue;

    const ext = extensionOf(file);
    const resourceType = IMAGE_EXTENSIONS.includes(ext)
      ? "image"
      : AUDIO_EXTENSIONS.includes(ext)
        ? "video"
        : null;
    if (!resourceType) continue;

    const asset: Asset = { file, relPath, publicId: toPublicId(relPath), resourceType };
    const existing = byId.get(asset.publicId);
    if (existing) {
      const rank = (a: Asset) => FORMAT_PRIORITY.indexOf(extensionOf(a.file));
      const [keep, drop] = rank(asset) < rank(existing) ? [asset, existing] : [existing, asset];
      console.warn(`! ${drop.relPath} and ${keep.relPath} share "${keep.publicId}", uploading ${keep.relPath}`);
      byId.set(keep.publicId, keep);
    } else {
      byId.set(asset.publicId, asset);
    }
  }

  return [...byId.values()];
}

function sign(params: Record<string, string>) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(payload + CLOUDINARY_API_SECRET).digest("hex");
}

async function upload({ file, relPath, publicId, resourceType }: Asset) {
  const params = {
    public_id: publicId,
    overwrite: "true",
    invalidate: "true",
    timestamp: Math.floor(Date.now() / 1000).toString(),
  };

  const form = new FormData();
  form.append("file", new Blob([await readFile(file)]), path.basename(file));
  for (const [key, value] of Object.entries(params)) form.append(key, value);
  form.append("api_key", CLOUDINARY_API_KEY!);
  form.append("signature", sign(params));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    { method: "POST", body: form },
  );
  const json = (await res.json()) as { version?: number; error?: { message: string } };
  if (!res.ok || !json.version) throw new Error(`${relPath}: ${json.error?.message ?? res.statusText}`);
  console.log(`✓ ${relPath} -> ${publicId} (v${json.version})`);
  return json.version;
}

async function readVersions(): Promise<Record<string, number>> {
  try {
    return JSON.parse(await readFile(VERSIONS_FILE, "utf8"));
  } catch {
    return {};
  }
}

const assets = await collectAssets(process.argv[2]);
const queue = [...assets];
const versions = await readVersions();
let failed = 0;

await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let asset = queue.shift(); asset; asset = queue.shift()) {
      try {
        versions[asset.publicId] = await upload(asset);
      } catch (err) {
        failed++;
        console.error(`✗ ${(err as Error).message}`);
      }
    }
  }),
);

const sorted = Object.fromEntries(Object.entries(versions).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(VERSIONS_FILE, JSON.stringify(sorted, null, 2) + "\n");

console.log(`\nUploaded ${assets.length - failed}/${assets.length} to cloud "${CLOUDINARY_CLOUD_NAME}".`);
process.exit(failed ? 1 : 0);
