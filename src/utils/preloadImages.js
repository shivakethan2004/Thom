// ─────────────────────────────────────────────────────────────────────────
// Preloads a list of remote image URLs before the app is considered "ready".
// Resolves per-image (never rejects the whole batch) so one broken/slow URL
// can't hang the loading screen forever — failures are just logged and
// counted as "done" so the progress bar still completes.
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {string[]} urls - image URLs to preload
 * @param {(progress: number) => void} [onProgress] - called with 0..1 as each image resolves
 * @param {number} [timeoutMs] - max time to wait per image before giving up on it
 * @returns {Promise<{ loaded: number, failed: string[] }>}
 */
export function preloadImages(urls, onProgress, timeoutMs = 8000) {
  const total = urls.length;
  let completed = 0;
  const failed = [];

  if (total === 0) {
    onProgress?.(1);
    return Promise.resolve({ loaded: 0, failed: [] });
  }

  const loadOne = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      let settled = false;

      const finish = (ok) => {
        if (settled) return;
        settled = true;
        if (!ok) failed.push(url);
        completed += 1;
        onProgress?.(completed / total);
        resolve();
      };

      const timer = setTimeout(() => finish(false), timeoutMs);

      img.onload = () => {
        clearTimeout(timer);
        finish(true);
      };
      img.onerror = () => {
        clearTimeout(timer);
        finish(false);
      };
      img.src = url;
    });

  return Promise.all(urls.map(loadOne)).then(() => ({
    loaded: total - failed.length,
    failed,
  }));
}

/**
 * Waits for the browser's font loading API to report the given fonts ready.
 * Falls back to resolving immediately if the Font Loading API isn't available.
 * @param {string[]} fontFamilies - e.g. ["Glimmer", "NCL Gasdrifo"]
 */
export function preloadFonts(fontFamilies = []) {
  if (typeof document === "undefined" || !document.fonts) {
    return Promise.resolve();
  }
  const checks = fontFamilies.map((family) =>
    document.fonts.load(`1em "${family}"`).catch(() => null)
  );
  return Promise.all(checks).then(() => document.fonts.ready).catch(() => null);
}
