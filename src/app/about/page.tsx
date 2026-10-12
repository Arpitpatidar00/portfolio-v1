import type { Metadata } from "next";
import { AboutPage } from "@/modules/aboutPage";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  jsonLdGraph,
  personJsonLd,
  profilePageJsonLd,
} from "@/lib/seo";

const title = "About & Resume";

export const metadata: Metadata = buildPageMetadata({
  title,
  description:
    "Resume of Arpit Patidar: full-stack engineer at Metaverse Ventures building cross-chain payment platforms. Experience, projects, skills and education.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          personJsonLd(),
          profilePageJsonLd("/about", `${title} | Arpit Patidar`),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />
      <AboutPage />
    </>
  );
}
