import type { Metadata, Viewport } from "next";
import { Syne, EB_Garamond, Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Footer } from "@/modules/landingPage/footer";
import { ConnectSection } from "@/modules/landingPage/connect-section";
import { AppShell } from "@/layout/AppShell";
import { siteConfig } from "@/constants";
import { getSiteUrl, isProductionDeployment } from "@/lib/seo";
import { CLOUDINARY_ORIGIN } from "@/lib/cloudinary";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: "/" }],
  creator: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${siteConfig.name} — Portfolio`,
    locale: siteConfig.locale,
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@devArpit0",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  // Preview/staging deployments must never be indexed.
  robots: isProductionDeployment()
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

/*
 * The intro loader plays once per browser session. This runs before first
 * paint so returning visitors never see a flash of the loader.
 */
const introSeenScript = `try{if(sessionStorage.getItem("intro-seen")==="1")document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${syne.variable} ${ebGaramond.variable} ${outfit.variable} ${dancingScript.variable} h-full antialiased dark`}
    >
      <head>
        {/* All media comes from Cloudinary; open the connection before the first image is discovered. */}
        <link rel="preconnect" href={CLOUDINARY_ORIGIN} />
        <script dangerouslySetInnerHTML={{ __html: introSeenScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <AppShell>
          {children}
          <ConnectSection />
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
