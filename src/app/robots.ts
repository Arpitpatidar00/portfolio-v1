import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments are blocked entirely so they never compete with production.
  if (!isProductionDeployment()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
