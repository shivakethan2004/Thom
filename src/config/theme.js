// ─────────────────────────────────────────────────────────────────────────
// THEME / COLOR CONFIG
// This is the ONE file to edit to change every color across the whole site.
// Values here are pushed into CSS custom properties at runtime (see
// src/main.jsx → applyTheme()), so any component using var(--color-xxx)
// in its CSS will update automatically. No need to touch component files.
// ─────────────────────────────────────────────────────────────────────────

export const colors = {
  // Core brand palette (from the brief)
  olive: "#596341",   // primary — deep olive green
  cream: "#FDFCF3",   // primary — off-white / paper background
  sand: "#E0CEB6",    // secondary — warm beige accent
  grey: "#A8A8A2",    // secondary — neutral grey (adjust as needed)

  // Derived / utility tones — safe defaults, tweak freely.
  // Keeping these as separate keys (instead of hardcoding rgba() in CSS)
  // means every shade of "olive" or "cream" stays in sync from one place.
  oliveDark: "#3F4630",
  oliveLight: "#7A8560",
  charcoal: "#232420",   // near-black text on light backgrounds
  white: "#FFFFFF",
  overlay: "rgba(35, 36, 32, 0.55)", // used for image hover / modal overlays
};

// Semantic roles — components should reference THESE, not raw color names,
// so you can re-theme the site by re-mapping roles without hunting through
// every component.
export const theme = {
  background: colors.cream,
  surface: colors.sand,
  textPrimary: colors.charcoal,
  textInverse: colors.cream,
  accent: colors.olive,
  accentHover: colors.oliveDark,
  border: colors.grey,
  overlay: colors.overlay,
};

// Flattened map used to generate CSS custom properties.
// Produces variables like: --color-olive, --color-cream, --theme-accent, etc.
export function getCssVariableMap() {
  const vars = {};
  Object.entries(colors).forEach(([key, value]) => {
    vars[`--color-${kebabCase(key)}`] = value;
  });
  Object.entries(theme).forEach(([key, value]) => {
    vars[`--theme-${kebabCase(key)}`] = value;
  });
  return vars;
}

function kebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
