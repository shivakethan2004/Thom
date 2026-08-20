import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../constants/links";

const pad = (n) => String(n).padStart(2, "0");

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = testimonials.length;
  const current = testimonials[index];

  const handleNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  };

  return (
    <section className="relative bg-cream px-6 py-20 text-olive md:px-10 lg:py-28">
      <div className="relative mx-auto max-w-content">
        {/* ---- Top row: label + arrows ---- */}
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] tracking-widest2 text-olive/60">
            TESTIMONIALS
          </span>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="font-body text-lg text-olive/60 transition-colors hover:text-olive"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="font-body text-lg text-olive/60 transition-colors hover:text-olive"
            >
              →
            </button>
          </div>
        </div>

        {/* ---- Main grid ---- */}
        <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-0">
          {/* ---- Left: copy ---- */}
          <div className="order-2 md:order-1 md:pr-12 lg:pr-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? 16 : -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction > 0 ? -16 : 16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-body text-xs tracking-widest2 text-olive/50">
                  {pad(index + 1)} / {pad(total)}
                </p>

                <h2 className="mt-5 font-display text-3xl font-light leading-[1.15] text-olive md:text-4xl lg:text-5xl">
                  {current.name}
                </h2>

                <p className="mt-6 font-body text-sm leading-relaxed text-olive/70 md:text-[15px]">
                  {current.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ---- Right: photo ---- */}
          <div className="order-1 md:order-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl md:aspect-[4/3] lg:aspect-[16/11]"
              >
                <img
                  src={current.url}
                  alt={`${current.name} wedding photo`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
