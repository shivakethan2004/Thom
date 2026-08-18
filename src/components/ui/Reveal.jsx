import { motion } from "framer-motion";

/**
 * Reveal
 * -----------------------------------------------------------------------
 * Fade + slide-up entrance, staggered by `index`. This mirrors the API
 * your project already references (components/PageTransition/Reveal —
 * `index`, `as`, `className`/`style`, children). If you already have that
 * component, just delete this file and keep your imports pointed at
 * "../PageTransition/Reveal" instead — Hero.jsx doesn't care which one
 * it gets as long as the props match.
 * -----------------------------------------------------------------------
 */

const EASE = [0.22, 1, 0.36, 1];
const STEP = 0.12; // delay added per index

export default function Reveal({ as: Tag = "div", index = 0, className, style, children, ...props }) {
  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE, delay: index * STEP }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}