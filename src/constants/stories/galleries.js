/**
 * Maps each story to its House of Maya gallery embed details.
 *
 * For now every story points at the same "Shaik Faruk & Aira" gallery.
 * Once you have real per-couple galleries, just add a new entry keyed
 * by slug and update the story's `href` (e.g. "/stories/shaik-faruk-aira")
 * to match its key here.
 */

const DEFAULT_GALLERY = {
  slideshowId: "6a7ec0e1e53e4f8662490c17",
  scriptSrc:
    "https://galleries.thehouseofmaya.in/-shaik-faruk-aira/slideswebcomponentembed.js/6a7ec0e1e53e4f8662490c17?features=lightbox,pinterest&filtertags=",
  thumbnail: "/images/shaik-faruk-aira-thumb.jpg",
  name: "Shaik Faruk & Aira",
  subtitle: "Wedding",
  date: "August 9, 2026",
};

export const galleries = {
  "shaik-faruk-aira": DEFAULT_GALLERY,
  // Add more real entries here later, e.g.:
  // "another-couple": {
  //   slideshowId: "xxxxxxxxxxxxxxxxxxxxxxxx",
  //   scriptSrc: "https://galleries.thehouseofmaya.in/.../slideswebcomponentembed.js/xxxxxxxxxxxxxxxxxxxxxxxx?...",
  //   thumbnail: "/images/another-couple-thumb.jpg",
  //   name: "Another Couple",
  //   subtitle: "Wedding",
  //   date: "September 1, 2026",
  // },
};

/**
 * Looks up a gallery by slug, falling back to the default gallery
 * if the slug isn't found yet — so every story link works today.
 */
export function getGalleryBySlug(slug) {
  return galleries[slug] || DEFAULT_GALLERY;
}