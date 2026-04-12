"use client";

import { useMusic } from "@/context/MusicContext";

/**
 * useAudioPlayer is now a wrapper around the centralized MusicContext
 * to maintain compatibility with existing components while benefiting
 * from single-source-of-truth state management.
 */
export const useAudioPlayer = () => {
  return useMusic();
};
