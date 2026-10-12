import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants";

/*
 * Social preview card (LinkedIn, X, WhatsApp, Slack…), generated at build
 * time. Applies to every page; add an opengraph-image.tsx inside a route
 * folder to override it for that page.
 */

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "assets/self1.jpeg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050505",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 64px",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#FF5E41" }}>
            (PORTFOLIO)
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
              ARPIT PATIDAR
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 38, color: "#FF5E41" }}>
              {siteConfig.jobTitle}
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 26, color: "rgba(255,255,255,0.55)" }}>
              Next.js · Node.js · TypeScript · Web3 payments
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "rgba(255,255,255,0.4)" }}>
            {siteConfig.location.toUpperCase()}
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${portrait}`}
          alt=""
          width={413}
          height={630}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
