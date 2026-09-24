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

  "om-kriti-sneakpeek": {
    slideshowId: "6aae0329413bbfbfc18848d4",
    scriptSrc:
      "https://galleries.thehouseofmaya.in/-om-kriti-sneakpeek/slideswebcomponentembed.js/6aae0329413bbfbfc18848d4?features=lightbox,pinterest&filtertags=",
    thumbnail: "/images/om-kriti-sneakpeek-thumb.jpg",
    previewSrc: "blob:https://galleries.thehouseofmaya.in/7b339fb8-7191-48bc-922d-62a2a504c2f8",
    name: "Om + Kriti",
    subtitle: "Wedding",
    date: "2026",
  },

  "divya-narasimha": {
    slideshowId: "6ab39e0ae07a0bac7b58d435",
    scriptSrc:
      "https://galleries.thehouseofmaya.in/-2025-divya-narasimha/slideswebcomponentembed.js/6ab39e0ae07a0bac7b58d435?features=lightbox,pinterest&filtertags=",
    thumbnail: "/images/divya-narasimha-thumb.jpg",
    name: "Divya + Narasimha",
    subtitle: "Wedding",
    date: "April 19, 2024",
  },

  "hema-bindu-sridhar": {
    slideshowId: "6aa28bc07f6fe2f83029a870",
    scriptSrc:
      "https://galleries.thehouseofmaya.in/-hema-bindu-sridhar/slideswebcomponentembed.js/6aa28bc07f6fe2f83029a870?features=lightbox,pinterest&filtertags=",
    thumbnail: "/images/hema-bindu-sridhar-thumb.jpg",
    previewSrc: "blob:https://galleries.thehouseofmaya.in/5cadd1bd-95ba-41f9-a859-a68ec4fef8b5",
    name: "Hema Bindu + Sridhar",
    subtitle: "Wedding",
    date: "2026", // TODO: confirm actual date
  },

  "chitra-suraj-sneak-peek": {
    slideshowId: "6aae755819390fb6e134ad9e",
    scriptSrc:
      "https://galleries.thehouseofmaya.in/-chitra-suraj-sneak-peek/slideswebcomponentembed.js/6aae755819390fb6e134ad9e?features=lightbox,pinterest&filtertags=",
    thumbnail: "/images/chitra-suraj-thumb.jpg",
    previewSrc: "blob:https://galleries.thehouseofmaya.in/657289f5-56b8-4917-a2cf-0c9bee3af046",
    name: "Chitra + Suraj",
    subtitle: "Wedding",
    date: "2026", // TODO: confirm actual date
  },

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