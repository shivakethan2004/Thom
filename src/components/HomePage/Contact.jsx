import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Reveal from "../PageTransition/Reveal";
import { contact, cta } from "../../constants/links";
/* lucide-react no longer exports a trademarked "Instagram" glyph,
   so we draw the classic rounded-square + ring + dot mark ourselves. */
function InstagramIcon({ size = 14, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Sparkle({ className, delay = 0, duration = 3 }) {
  return (
    <motion.span
      className={`absolute rounded-full bg-cream/70 ${className}`}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  );
}

function ParallaxDrift({ className, scrollRange = [0, -40], progress, children }) {
  const y = useTransform(progress, [0, 1], scrollRange);
  return (
    <motion.div style={{ y }} className={`pointer-events-none select-none ${className}`}>
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full  overflow-hidden bg-olive-800       py-24 md:py-32"
    >
      {/* ---- Ambient background glow, centered behind the logo ---- */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/10 blur-3xl md:h-[560px] md:w-[560px]"
      />

      {/* ---- Drifting decorative sparkles ---- */}
      <Sparkle className="left-[12%] top-[20%] h-1 w-1" delay={0} duration={4} />
      <Sparkle className="left-[85%] top-[30%] h-1.5 w-1.5" delay={1.2} duration={5} />
      <Sparkle className="left-[20%] top-[75%] h-1 w-1" delay={0.6} duration={3.5} />
      <Sparkle className="left-[78%] top-[70%] h-1.5 w-1.5" delay={1.8} duration={4.5} />
      <Sparkle className="left-[50%] top-[12%] h-1 w-1" delay={2.2} duration={4} />

      {/* ---- Parallax corner leaves for continuity with rest of page ---- */}
      <ParallaxDrift
        progress={scrollYProgress}
        scrollRange={[0, -60]}
        className="absolute -left-10 -top-6 z-0 w-28 opacity-20 md:w-36 lg:w-44"
      >
        <img src="/images/leaf2.png" alt="" aria-hidden="true" />
      </ParallaxDrift>
      <ParallaxDrift
        progress={scrollYProgress}
        scrollRange={[0, 60]}
        className="absolute -right-10 bottom-0 z-0 w-28 opacity-20 md:w-36 lg:w-44"
      >
        <img src="/images/curvedleaf.png" alt="" aria-hidden="true" />
      </ParallaxDrift>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex max-w-content flex-col items-center px-6 text-center"
      >
        {/* ---- Logo with soft pulsing glow ring ---- */}
        <Reveal index={0}>
          <div className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-cream/30"
            />
            <img
              src="/images/logo-white.png"
              alt="Logo"
              className="relative h-12 w-12 object-contain md:h-14 md:w-14"
            />
          </div>
        </Reveal>

        <Reveal index={1}>
          <p className="mt-8 font-body text-[0.65rem] tracking-widest2 text-cream/60">
            START YOUR JOURNEY
          </p>
        </Reveal>

        <Reveal index={2}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-light text-cream md:text-5xl">
            Let's create something beautiful
          </h2>
        </Reveal>

        <Reveal index={3}>
          <p className="mt-5 max-w-md font-body text-sm font-light leading-relaxed text-cream/70 md:text-base">
            Every story deserves to be told with care. Reach out and let's
            talk about capturing yours.
          </p>
        </Reveal>

        {/* ---- Primary CTA — magnetic-feeling hover, arrow slides in ---- */}
        <Reveal index={4} className="mt-10">
          <Link to={cta.contact} className="group relative inline-block">
            <span className="relative z-10 flex items-center gap-3 rounded-full border border-cream/40 bg-transparent px-8 py-3.5 font-body text-xs tracking-widest2 text-cream transition-colors duration-300 group-hover:border-cream group-hover:text-olive-900">
              BEGIN YOUR STORY
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <span className="absolute inset-0 z-0 scale-95 rounded-full bg-cream opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />
          </Link>
        </Reveal>

        {/* ---- Contact details row ---- */}
        <Reveal index={5} className="mt-14 w-full">
          <div className="mx-auto h-px w-16 bg-cream/20" />
          <div className="mt-10 flex flex-col items-center justify-center gap-6 text-cream/70 sm:flex-row sm:gap-10">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-2 font-body text-xs tracking-wide transition-colors duration-300 hover:text-cream"
            >
              <Mail size={14} className="text-cream/50 transition-colors group-hover:text-cream" />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="group flex items-center gap-2 font-body text-xs tracking-wide transition-colors duration-300 hover:text-cream"
            >
              <Phone size={14} className="text-cream/50 transition-colors group-hover:text-cream" />
              {contact.phone}
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 font-body text-xs tracking-wide transition-colors duration-300 hover:text-cream"
            >
              <InstagramIcon size={14} className="text-cream/50 transition-colors group-hover:text-cream" />
              {contact.instagramHandle}
            </a>
            <span className="flex items-center gap-2 font-body text-xs tracking-wide text-cream/70">
              <MapPin size={14} className="text-cream/50" />
              {contact.location}
            </span>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}