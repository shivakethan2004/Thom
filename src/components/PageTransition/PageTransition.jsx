import { motion as m } from "framer-motion";
import { motion as motionConfig } from "../../config/motion";

/**
 * "Focus Pull" page transition — converted from the reference HTML animation.
 *
 * Original technique: the outgoing page racks OUT of focus (blur + scale up
 * slightly), then ~260ms later the incoming page — which started blurred,
 * slightly oversized, and invisible — racks IN to focus while fading up.
 * A bloom flash and a grain overlay (see BloomOverlay.jsx / GrainOverlay.jsx)
 * punctuate the crossover.
 *
 * Usage: wrap each routed page in <PageTransition>, and render
 * <AnimatePresence mode="wait"> around the <Routes> in App.jsx. Trigger
 * <BloomOverlay> / <GrainOverlay> alongside it (see App.jsx) for the full
 * effect — they're separate because they sit above everything, not scoped
 * to one page.
 */
const variants = {
  // Incoming page: blurred, slightly larger, invisible — racks into focus
  initial: {
    opacity: 0,
    scale: 1.045,
    filter: "blur(18px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      opacity: { duration: motionConfig.inOpacityDuration, ease: "easeOut" },
      filter: { duration: motionConfig.inFilterDuration, ease: motionConfig.inEase },
      scale: { duration: motionConfig.inFilterDuration, ease: motionConfig.inEase },
    },
  },
  // Outgoing page: racks OUT of focus (blur up, scale up slightly)
  exit: {
    scale: 1.03,
    filter: "blur(20px)",
    transition: {
      duration: motionConfig.outDuration,
      ease: motionConfig.outEase,
    },
  },
};

export default function PageTransition({ children }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <m.div variants={variants} initial="initial" animate="animate" exit="exit">
        {children}
      </m.div>
    </div>
  );
}
