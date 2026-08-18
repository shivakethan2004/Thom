import { motion as m } from "framer-motion";
import { motion as motionConfig } from "../../config/motion";

/**
 * Converted from the reference animation's `.stagger` elements — text and
 * UI pieces that drift up + sharpen into focus (blur → 0, translateY → 0,
 * opacity → 1) one after another as a page settles.
 *
 * Usage:
 * ```jsx
 * <Reveal index={0}><span className="eyebrow">CELEBRATING 10 YEARS</span></Reveal>
 * <Reveal index={1}><h1>We preserve the fleeting forever</h1></Reveal>
 * <Reveal index={2}><p>A wedding story, told in film and light —</p></Reveal>
 * ```
 * `index` controls the stagger order/delay — same role as the reference's
 * `data-d` attribute. Reuse indices across a visual group (e.g. a headline
 * and its underline rule can share index 1) to have them appear together.
 */
export default function Reveal({ children, index = 0, as = "div", ...rest }) {
  const Tag = m[as] || m.div;

  return (
    <Tag
      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.6,
          ease: motionConfig.inEase,
          delay: motionConfig.staggerBase + index * motionConfig.staggerStep,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.25,
          delay: index * motionConfig.staggerOutStep,
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
