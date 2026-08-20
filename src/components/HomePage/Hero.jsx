import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { media } from "../../constants/links";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <motion.img
        src={media.heroImage}
        alt="The House of Maya"
        style={{ y: imageY }}
        className="
          absolute
          -top-[6%]
          left-0
          h-[112%]
          w-full
          object-cover
          transform-gpu
        "
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </section>
  );
}