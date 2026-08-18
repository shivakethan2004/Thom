import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../PageTransition/Reveal";
import Kicker from "../ui/Kicker";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Divider from "../ui/Divider";
import Button from "../ui/Button";
import { hero } from "../../constants/text";
import { media, cta } from "../../constants/links";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Image drifts down slightly slower than the page scrolls — classic parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Parallax background image — buffer sized to match the 12% drift range,
          not oversized beyond that, so the source isn't upscaled more than needed */}
      <motion.img
        src={media.heroImage}
        alt="The House of Maya"
        style={{ y: imageY, willChange: "transform" }}
        className="absolute -top-[6%] left-0 h-[112%] w-full transform-gpu object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Warm sand color wash — sits under the olive scrim for a beach-toned layer */}
      <div className="absolute inset-0 bg-sand/20 mix-blend-overlay" />

      <div className="absolute inset-0 bg-olive-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-olive-900/50 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <Reveal index={0}>
          <Kicker tone="cream" className="mb-5">
            {hero.kicker}
          </Kicker>
        </Reveal>

        <Reveal index={1} as="h1">
          <Heading
            as="span"
            size="2xl"
            weight="font-light"
            className="!text-cream block max-w-3xl mx-auto"
          >
            {hero.titleLine1}{" "}
            <span className="font-normal text-sand">{hero.titleEmphasis}</span>
            <br />
            {hero.titleLine2}
          </Heading>
        </Reveal>

        <Reveal index={2}>
          <Divider tone="text-cream" className="my-6" />
        </Reveal>

        <Reveal index={3}>
          <Text tone="cream" size="lg" className="max-w-xl mx-auto font-light">
            {hero.subtitle}
          </Text>
        </Reveal>

        <Reveal index={4} className="mt-9">
          <Button href={cta.primary} variant="solid">
            {hero.ctaLabel}
          </Button>
        </Reveal>

        <Reveal
          index={5}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-body text-[0.65rem] tracking-widest2 text-cream/80">
            {hero.scrollLabel.toUpperCase()}
          </span>
          <span className="h-10 w-px bg-cream/60" />
        </Reveal>
      </div>
    </section>
  );
}