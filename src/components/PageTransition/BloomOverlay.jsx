import { motion as m } from "framer-motion";
import { motion as motionConfig } from "../../config/motion";

/**
 * Soft warm "bloom" flash that pulses once during a page transition — same
 * radial-gradient + `mix-blend-mode: screen` technique as the reference
 * animation. Uses the theme's accent color so it re-tints automatically if
 * you change src/config/theme.js.
 */
export default function BloomOverlay({ active }) {
  return (
    <m.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: active ? motionConfig.bloomPeak : 0 }}
      transition={{
        duration: active ? motionConfig.bloomInDuration : motionConfig.bloomOutDuration,
        ease: "easeInOut",
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 59,
        pointerEvents: "none",
        mixBlendMode: "screen",
        background:
          "radial-gradient(circle at 55% 42%, var(--color-sand), transparent 60%)",
      }}
    />
  );
}
