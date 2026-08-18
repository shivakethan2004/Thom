import { useEffect, useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { motion as motionConfig } from "../../config/motion";
import "./Loader.css";

/**
 * Full-screen entry loader — "The House of Maya"
 *
 * Sits over a dimmed portrait while assets preload, then lifts away like a
 * curtain once `visible` goes false. Uses the same easing curves as
 * PageTransition so the handoff into the site feels continuous.
 */
export default function Loader({ progress = 0, visible }) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Ease the raw number toward its target instead of snapping — reads
  // calmer over a fast asset load.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplayProgress((prev) => prev + (progress - prev) * 0.15);
    });
    return () => cancelAnimationFrame(id);
  }, [progress]);

  const pct = Math.min(100, Math.round(displayProgress));

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="loader"
          initial={false}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="loader__bg" />
          <div className="loader__scrim" />

          <m.div
            className="loader__content"
            exit={{
              opacity: 0,
              scale: 1.06,
              filter: "blur(14px)",
              transition: { duration: 0.6, ease: motionConfig.outEase },
            }}
          >
            <m.img
              src="/images/logo-mark.png"
              alt="The House of Maya"
              className="loader__mark"
              initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: motionConfig.inEase }}
            />

            <m.p
              className="loader__wordmark"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: motionConfig.inEase }}
            >
              The House of Maya
            </m.p>

            <div className="loader__bar" aria-hidden="true">
              <m.div
                className="loader__bar-fill"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>

            <span className="loader__pct">{pct}%</span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}