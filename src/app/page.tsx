import type { Metadata } from "next";
import { preload } from "react-dom";
import { LandingPage } from "@/modules/landingPage";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/constants";
import { HERO_BG_URL } from "@/constants/media";
import {
  buildPageMetadata,
  jsonLdGraph,
  personJsonLd,
  profilePageJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  // The hero's background face is a CSS background (normally discovered late);
  // preloading it lets the browser fetch it with the HTML, improving LCP.
  preload(HERO_BG_URL, { as: "image", fetchPriority: "high" });

  return (
    <main className="min-h-screen">
      <JsonLd
        data={jsonLdGraph(
          personJsonLd(),
          websiteJsonLd(),
          profilePageJsonLd("/", siteConfig.title),
        )}
      />
      <LandingPage />
    </main>
  );
}
