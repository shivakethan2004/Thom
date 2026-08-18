// ─────────────────────────────────────────────────────────────────────────
// LINKS & SITE CONTENT CONFIG
// This is the ONE file to edit to change navigation, external/social links,
// and the photo catalog. Nothing in components should hardcode a URL —
// everything is pulled from here so future changes never require touching
// component code.
// ─────────────────────────────────────────────────────────────────────────

// Site-wide meta
export const site = {
  title: "Studio Name",
  tagline: "Photography & Visual Catalog",
  email: "hello@example.com",
};

// Primary nav — order here = order rendered in the Navbar
export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Catalog", path: "/catalog" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

// External / social links — referenced by key wherever needed
// (footer, contact page, navbar icons, etc.)
export const socialLinks = {
  instagram: "https://instagram.com/yourhandle",
  behance: "https://behance.net/yourhandle",
  pinterest: "https://pinterest.com/yourhandle",
  whatsapp: "https://wa.me/910000000000",
};

// ─────────────────────────────────────────────────────────────────────────
// CATALOG DATA
// Every image is a remote URL (Cloudinary / S3 / Imgix / etc.) — nothing is
// stored locally. Add/remove/edit projects and image URLs here only.
// `cover` is used on listing/grid views, `gallery` is the full set shown
// on a project's detail view.
// ─────────────────────────────────────────────────────────────────────────

export const catalog = [
  {
    id: "project-01",
    title: "Placeholder Project One",
    category: "Editorial",
    cover: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600",
    ],
    externalLink: "", // e.g. a full gallery / client link, optional
  },
  {
    id: "project-02",
    title: "Placeholder Project Two",
    category: "Portrait",
    cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600",
    ],
    externalLink: "",
  },
];

// Images that must be ready before the site reveals itself
// (see src/hooks/useAssetPreloader.js + src/components/Loader).
// Keep this list intentionally small — hero/above-the-fold images only.
// The rest of the catalog can lazy-load as the user scrolls/navigates.
export const criticalImages = [
  ...catalog.map((project) => project.cover),
];
