import type { MetadataRoute } from "next";
import { absoluteUrl, indexablePages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(lastModified),
  }));
}
