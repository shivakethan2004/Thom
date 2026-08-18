/**
 * text.js
 * -----------------------------------------------------------------------
 * Every string rendered on the site lives here, grouped by section/
 * component. Components import from this file instead of hard-coding
 * copy, so content can change without touching JSX.
 *
 * Keys are stable identifiers (used by nav, etc.) — only edit the
 * *values*, not the keys, unless you're also updating links.js.
 * -----------------------------------------------------------------------
 */

export const site = {
  name: "thom",
  tagline: "The House of Maya",
};

export const nav = {
  links: {
    house: "The House",
    stories: "Stories",
    films: "Films",
    artist: "The Artist",
    testimonials: "Testimonials",
  },
  cta: "Begin your Story",
};

export const hero = {
  kicker: "Cinematic • Intimate • Timeless",
  // `titleEmphasis` is rendered in italics inside the title — see Hero.jsx
  titleLine1: "Every",
  titleEmphasis: "Love Story",
  titleLine2: "Deserves to be Told.",
  subtitle:
    "At The House of Maya, we capture the real, the raw, and the remarkable.",
  ctaLabel: "Begin your Story",
  scrollLabel: "Scroll",
};
export const philosophy = {
  kicker: "OUR PHILOSOPHY",
  title: "We don't just capture moments, we preserve the feeling.",
  body: "The quiet glances, the loud laughs, the in-between everything. Timeless stories, artfully told.",
};