import { useEffect, useRef, useState } from "react";
import { preloadImages, preloadFonts } from "../utils/preloadImages";
import { criticalImages } from "../config/links";

/**
 * Drives the initial loading screen. Preloads critical images + fonts
 * before flipping `isReady` to true. The Loader component watches this
 * hook and stays mounted (blocking the rest of the app) until it's done.
 *
 * To add more images that should block first paint, add them to
 * `criticalImages` in src/config/links.js — nothing here needs to change.
 */
export function useAssetPreloader({ fontFamilies = ["Glimmer", "NCL Gasdrifo"] } = {}) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return; // avoid double-run under StrictMode
    startedRef.current = true;

    let cancelled = false;

    async function run() {
      // Fonts + images load in parallel; progress bar reflects image
      // progress since that's usually the slower/larger payload.
      const fontsPromise = preloadFonts(fontFamilies);
      const imagesPromise = preloadImages(criticalImages, (p) => {
        if (!cancelled) setProgress(p);
      });

      await Promise.all([fontsPromise, imagesPromise]);

      if (!cancelled) {
        setProgress(1);
        setIsReady(true);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [fontFamilies]);

  return { progress, isReady };
}
