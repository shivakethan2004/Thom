# Fonts

This project loads fonts as local files (self-hosted), not from Google Fonts
or any CDN — same "everything traceable, nothing mystery-loaded" approach as
the rest of the site.

## How to add your fonts

1. Convert your font files to `.woff2` (and `.woff` as a fallback) if they
   aren't already — woff2 is smaller and all modern browsers support it.
   Tools: [Transfonter](https://transfonter.org/) or `fonttools` locally.
2. Drop the converted files into `public/fonts/`.
3. Open `src/fonts/fonts.css` and:
   - Rename the `font-family` values to your actual font names.
   - Rename the `url(...)` paths to match your actual filenames.
   - Delete any `@font-face` blocks for weights you don't have.
4. Open `src/index.css` and update the `--font-display` / `--font-body` /
   `--font-accent` variables to point at your family names.

That's it — every component reads from those three CSS variables, so
nothing else needs to change.
