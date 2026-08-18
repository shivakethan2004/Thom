# Photo Portfolio — Starter Scaffold

React + Vite starter for a photography portfolio/catalog site. This is a
**scaffold**, not the finished site — routing, theming, fonts, the
preloader, navbar, and page-transition animation are wired up; the actual
pages/content are placeholders for you to build out.

## Run it

```bash
npm install
npm run dev
```

## Where to edit things

| What you want to change              | File                                  |
|---------------------------------------|----------------------------------------|
| Colors (whole site)                   | `src/config/theme.js`                  |
| Nav links, social links, catalog data | `src/config/links.js`                  |
| Fonts                                 | `src/fonts/fonts.css` + `src/fonts/README.md` |
| Page-load splash screen               | `src/components/Loader/`               |
| Page-transition timing/easing         | `src/config/motion.js`                 |
| Page-transition animation             | `src/components/PageTransition/`       |
| Navbar                                | `src/components/Navbar/`               |
| Which images block first paint        | `criticalImages` in `src/config/links.js` |

Nothing else in the codebase should need touching for day-to-day content
or link changes — that's the point of the two config files above.

## How it fits together

- **No local image assets.** Every image is a remote URL living in
  `src/config/links.js` (`catalog[].cover`, `catalog[].gallery`). Swap in
  your real CDN/Cloudinary/S3 URLs there.
- **Colors** are defined once in `src/config/theme.js` and pushed onto CSS
  custom properties (`--color-*`, `--theme-*`) at runtime in `main.jsx`.
  Every component's CSS reads from those variables — change a hex value in
  one place, the whole site updates.
- **Fonts** are self-hosted (not Google Fonts/CDN). Drop your two (or
  three) font files into `public/fonts/`, wire the filenames into
  `src/fonts/fonts.css`, done — see `src/fonts/README.md`.
- **Loading screen**: `src/hooks/useAssetPreloader.js` preloads
  `criticalImages` (from `links.js`) and your fonts before `App.jsx`
  reveals any route. `src/components/Loader` is the visual — replace its
  markup/animation with your reference HTML animation whenever you share
  it; it only needs `progress` (0–1) and `visible` as inputs.
- **Page transitions — "Focus Pull"**: converted from your reference HTML
  animation. `src/components/PageTransition/PageTransition.jsx` blurs +
  scales the outgoing page out of focus, then the incoming page (which
  starts blurred/oversized/invisible) racks into focus while fading up —
  same choreography as the original, done with Framer Motion variants.
  `BloomOverlay.jsx` and `GrainOverlay.jsx` reproduce the warm light flash
  and film-grain flash that punctuate the crossover; both are wired into
  route changes in `App.jsx`. `Reveal.jsx` converts the original's
  `.stagger` elements — text/UI that drifts up and sharpens into focus one
  piece at a time as a page settles (see it in use in `pages/Home.jsx`).
  All timing/easing lives in `src/config/motion.js` — one place to tune the
  whole thing.
- **Routing**: `react-router-dom`. Pages live in `src/pages/`, routes are
  declared in `App.jsx`, nav items are generated from `navLinks` in
  `links.js`.

## Tech

React 19, Vite, `react-router-dom`, `framer-motion`. No UI kit — plain CSS
with custom properties, so the design stays fully in your control.

## Next steps (not done yet, on purpose)

- Real font files
- Real catalog/image URLs
- Actual page designs (Home/Catalog/About/Contact are placeholders)
- Catalog detail/lightbox view for `project.gallery`
