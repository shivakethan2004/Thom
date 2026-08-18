import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ENTRY_PHOTOS } from "../../constants/entryPhotos"; // adjust path to wherever ENTRY_PHOTOS actually lives

/**
 * Responsive mosaic layout.
 *
 * Instead of absolute-positioned percentages (the old approach, which only
 * ever looked right at the one viewport it was tuned for), every tile is
 * placed on an actual CSS grid with explicit line spans per breakpoint.
 * The grid reflows naturally at each breakpoint instead of relying on
 * fixed coordinates.
 *
 * - Mobile: 2 columns, only 4 photos shown — less visual noise, calmer.
 * - Tablet (sm): 3 columns, 6 photos.
 * - Desktop (lg+): 6 columns, all 8 photos, asymmetric spans.
 *
 * Deliberately left cells empty near the grid's center column(s) on every
 * breakpoint, so the logo/CTA overlay (rendered on top in EntryScreen)
 * always sits over the quietest part of the grid rather than fighting a
 * busy photo for attention.
 */

// className on each photo (photo--one … photo--eight) maps to a spot here.
// Edit spans below to reshape the mosaic — each entry is
// [colStart, colEnd, rowStart, rowEnd] per breakpoint, using CSS grid's
// end-exclusive line numbering (span of 2 = end - start = 2).
const LAYOUT = {
  "photo--one": {
    base: "col-start-1 col-end-2 row-start-1 row-end-2",
    sm: "sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3",
    lg: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  "photo--two": {
    base: "col-start-2 col-end-3 row-start-1 row-end-2",
    sm: "sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-2",
    lg: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  "photo--three": {
    base: "hidden",
    sm: "sm:hidden",
    lg: "lg:block lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
  "photo--four": {
    base: "hidden",
    sm: "sm:block sm:col-start-3 sm:col-end-4 sm:row-start-2 sm:row-end-3",
    lg: "lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-2",
  },
  "photo--five": {
    base: "col-start-1 col-end-2 row-start-2 row-end-3",
    sm: "sm:col-start-1 sm:col-end-2 sm:row-start-3 sm:row-end-4",
    lg: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  "photo--six": {
    base: "hidden",
    sm: "sm:hidden",
    lg: "lg:block lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
  "photo--seven": {
    base: "col-start-2 col-end-3 row-start-2 row-end-3",
    sm: "sm:col-start-2 sm:col-end-3 sm:row-start-3 sm:row-end-4",
    lg: "lg:col-start-5 lg:col-end-6 lg:row-start-2 lg:row-end-4",
  },
  "photo--eight": {
    base: "hidden",
    sm: "sm:block sm:col-start-1 sm:col-end-3 sm:row-start-4 sm:row-end-5",
    lg: "lg:col-start-6 lg:col-end-7 lg:row-start-2 lg:row-end-4",
  },
};

const containerVariants = {
  hidden: {},
  loaded: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, scale: 1.04 },
  loaded: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const PhotoGrid = ({ active = true }) => {
  const prefersReducedMotion = useReducedMotion();
  const animateState = active ? "loaded" : "hidden";

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      animate={animateState}
      className="
        pointer-events-none absolute inset-0 z-[1]
        grid h-full w-full gap-1.5 p-1.5
        grid-cols-2 grid-rows-3
        sm:grid-cols-3 sm:grid-rows-4 sm:gap-2 sm:p-2
        lg:grid-cols-6 lg:grid-rows-3 lg:gap-2.5 lg:p-3
      "
    >
      {ENTRY_PHOTOS.map((photo) => {
        const spot = LAYOUT[photo.className];
        if (!spot) return null;

        return (
          <motion.div
            key={photo.src}
            variants={prefersReducedMotion ? undefined : tileVariants}
            className={`
              relative overflow-hidden bg-olive/10
              ${spot.base} ${spot.sm} ${spot.lg}
            `}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="
                h-full w-full object-cover
                grayscale-[15%] contrast-[1.02] saturate-[0.92]
                transition-[filter,transform] duration-[1400ms] ease-out
                lg:hover:grayscale-0 lg:hover:saturate-100 lg:hover:scale-[1.03]
              "
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PhotoGrid;