import type { Metadata } from "next";
import { ContactPage } from "@/modules/contactPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, jsonLdGraph } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Arpit Patidar about a full-stack, Next.js or Web3 project. Send a message and get a reply directly by email.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />
      <ContactPage />
    </>
  );
}
