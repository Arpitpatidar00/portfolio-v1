import type { Metadata } from "next";
import { ProjectsPage } from "@/modules/projectsPage";
import { PROJECTS } from "@/constants/projects";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  jsonLdGraph,
  projectListJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects: Web3, DeFi & Next.js Apps",
  description:
    "Selected projects by Arpit Patidar: stablecoin and DeFi payment apps, Web3 platforms, SaaS and e-commerce built with Next.js, NestJS, Node.js and Supabase.",
  path: "/projects",
});

export default function ProjectsRoute() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          projectListJsonLd(
            PROJECTS.map(({ title, category, year, link, src }) => ({
              title,
              category,
              year,
              link,
              image: src,
            })),
          ),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        )}
      />
      <ProjectsPage />
    </>
  );
}
