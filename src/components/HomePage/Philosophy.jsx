import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../PageTransition/Reveal";
import Kicker from "../ui/Kicker";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Divider from "../ui/Divider";
import { philosophy } from "../../constants/text";

function Laurel({ className }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" className={className}>
      <path d="M20 2C14 10 6 14 4 24c-2 10 4 20 16 34" stroke="currentColor" strokeWidth="1" />
      {[8, 16, 24, 32, 40].map((y, i) => (
        <path key={i} d={`M${8 + i * 0.5} ${y}q6-4 10 2`} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------
 * ParallaxFloral — decorative floral image with scroll-linked drift.
 * Kept to a single transform (scroll-linked y only, no competing
 * looping `animate`) so it stays smooth on scroll.
 * ------------------------------------------------------------------- */
function ParallaxFloral({ src, className, scrollRange = [0, -40], progress }) {
  const y = useTransform(progress, [0, 1], scrollRange);
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      style={{ y }}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

export default function Philosophy() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // The text block drifts upward slightly slower than normal scroll,
  // giving a gentle parallax "settling in" feel as the section passes.
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cream py-20 md:py-28"
    >
      {/* ---- Decorative florals ---- */}
      <ParallaxFloral
        src="/images/floral1.png"
        progress={scrollYProgress}
        scrollRange={[0, -50]}
        className="absolute -left-6 -top-4 z-0 w-24 opacity-40 md:w-32 md:opacity-50 lg:w-40"
      />
      <ParallaxFloral
        src="/images/floral2.png"
        progress={scrollYProgress}
        scrollRange={[0, 50]}
        className="absolute -right-6 bottom-0 z-0 w-28 opacity-40 md:w-36 md:opacity-50 lg:w-44"
      />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-content mx-auto flex flex-col items-center px-6 text-center"
      >
        <Reveal index={0}>
          <Kicker className="mb-4 text-olive/70">{philosophy.kicker}</Kicker>
        </Reveal>

        <Reveal index={1}>
          <Heading
            as="h2"
            size="lg"
            weight="font-light"
            className="max-w-xl mx-auto text-2xl text-olive md:text-3xl"
          >
            {philosophy.title}
          </Heading>
        </Reveal>

        <Reveal index={2}>
          <Divider className="my-5 text-olive/40" />
        </Reveal>

        <Reveal index={3}>
          <Text
            size="base"
            className="max-w-md mx-auto text-sm font-light leading-relaxed text-olive/80 md:text-base"
          >
            {philosophy.body}
          </Text>
        </Reveal>

        <Reveal index={4} className="mt-10 flex items-center gap-4 text-olive/70">
          <span className="font-body text-[0.6rem] tracking-widest2">CELEBRATING</span>
          <span className="flex items-center gap-3">
            <Laurel className="h-7 w-4 scale-x-[-1]" />
            <span className="font-display text-2xl font-light text-olive">10</span>
            <Laurel className="h-7 w-4" />
          </span>
          <span className="font-body text-[0.6rem] tracking-widest2">YEARS OF ARTISTRY</span>
        </Reveal>
      </motion.div>
    </section>
  );
}