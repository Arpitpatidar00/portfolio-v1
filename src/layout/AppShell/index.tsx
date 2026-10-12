"use client";

import { MusicProvider } from "@/context/MusicContext";
import { AppLoader } from "@/components/AppLoader";
import { MusicOverlay } from "@/components/MusicOverlay";

/**
 * Client-only chrome (intro loader, music player and its context).
 * Kept out of the root layout so the layout can stay a Server Component
 * and export metadata.
 */
export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <MusicProvider>
    <AppLoader />
    <MusicOverlay />
    {children}
  </MusicProvider>
);
