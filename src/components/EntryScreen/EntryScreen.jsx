import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PhotoGrid from "./PhotoGrid";
import Logo from "./Logo";
import EnterButton from "./EnterButton";

const containerVariants = {
  hidden: { opacity: 0, scale: 1.015 },
  loaded: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { duration: 0.7 }, scale: { duration: 0.9, ease: [0.77, 0, 0.18, 1] } },
  },
  exiting: {
    y: "-100%",
    transition: { duration: 0.8, ease: [0.77, 0, 0.18, 1] },
  },
};

const EntryScreen = ({ onEnter }) => {
  const [status, setStatus] = useState("hidden"); // hidden -> loaded -> exiting
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setStatus("loaded"), 100);
    return () => window.clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setStatus("exiting");
    window.setTimeout(() => {
      if (typeof onEnter === "function") onEnter();
    }, prefersReducedMotion ? 0 : 800);
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate={status}
      transition={prefersReducedMotion ? { duration: 0 } : undefined}
      className="fixed inset-0 isolate h-[100dvh] w-full overflow-hidden bg-cream text-[#232420]"
    >
      {/* faint architectural grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(89,99,65,0.075) 1px, transparent 1px), linear-gradient(to bottom, rgba(89,99,65,0.075) 1px, transparent 1px)",
          backgroundSize: "clamp(70px,8vw,140px) clamp(70px,8vw,140px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      <PhotoGrid active={status !== "hidden"} />

      {/* center wash so the logo/CTA stay legible over the photos */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[58%] w-full
          -translate-x-1/2 -translate-y-1/2
          md:h-[58%] md:w-full
          lg:h-[62%] lg:w-[min(46vw,560px)]
          xl:w-[min(40vw,600px)]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(253,252,243,0) 0%, rgba(253,252,243,0.85) 15%, rgba(253,252,243,0.98) 32%, rgba(253,252,243,0.985) 50%, rgba(253,252,243,0.98) 68%, rgba(253,252,243,0.85) 85%, rgba(253,252,243,0) 100%)",
        }}
      />

      <section
        className="
          absolute left-1/2 top-1/2 z-[5] flex w-full -translate-x-1/2 -translate-y-1/2
          flex-col items-center px-6 py-7 text-center
          sm:w-[min(90%,440px)]
          lg:w-[min(90%,460px)]
          xl:w-[min(90%,500px)]
          2xl:w-[520px]
        "
      >
        <Logo />

        <div className="my-4 h-7 w-px bg-olive opacity-[0.58] sm:my-5 lg:my-7" />

        <p className="m-0 font-body text-[6.5px] uppercase leading-[1.8] tracking-[0.25em] text-olive sm:text-[8px] sm:tracking-[0.3em] lg:text-[9px] xl:text-[12px] xl:tracking-[0.4em]">
          Storytelling through
          <br />
          timeless imagery
        </p>

        <EnterButton onEnter={handleEnter} />

        <p className="mt-3 font-body text-[6px] uppercase leading-[1.6] tracking-[0.2em] text-[#232420]/[0.58] sm:mt-4 sm:text-[7px] sm:tracking-[0.25em] lg:text-[8px] lg:tracking-[0.3em]">
          Wedding photography &amp; films
        </p>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-[13px] z-[8] hidden items-center justify-between px-4 font-body text-[6px] uppercase tracking-[0.18em] text-[#232420]/[0.58] sm:flex sm:bottom-[22px] sm:px-6 lg:text-[7px] lg:tracking-[0.28em] lg:px-12">
        <span>The House of Maya</span>
        <span>India · Worldwide</span>
      </div>
    </motion.main>
  );
};

export default EntryScreen;