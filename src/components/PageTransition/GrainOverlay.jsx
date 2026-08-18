import { motion as m } from "framer-motion";
import { motion as motionConfig } from "../../config/motion";

/**
 * Full-screen SVG turbulence "grain" that flashes over the page during a
 * transition, same technique as the reference animation — an
 * <feTurbulence> filter blended with `mix-blend-mode: overlay`.
 *
 * Controlled entirely by the `active` boolean; the parent (App.jsx / a
 * layout) is responsible for flipping this true for the duration of a
 * route change.
 */
export default function GrainOverlay({ active }) {
  return (
    <m.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: active ? motionConfig.grainPeak : 0 }}
      transition={{
        duration: active ? 0.35 : 0.9,
        delay: active ? 0 : 0.1,
        ease: "easeInOut",
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <filter id="grain-turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-turbulence)" />
      </svg>
    </m.div>
  );
}
