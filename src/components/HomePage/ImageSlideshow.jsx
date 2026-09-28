import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slideshowImages } from "../../constants/links";

export default function ImageSlideshow({ interval = 5000, images = slideshowImages }) {
  const slides = images?.length ? images : slideshowImages;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((i) => {
    setDirection(i > index ? 1 : -1);
    setIndex((i + slides.length) % slides.length);
  }, [index, slides.length]);

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  const activeIndex = index % slides.length;

  // Preload slides so each image is ready when the carousel advances.
  useEffect(() => {
    slides.forEach(({ src }) => {
      new Image().src = src;
    });
  }, [slides]);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, interval);
    return () => clearInterval(t);
  }, [interval, slides.length]);

  const current = slides[activeIndex];

  return (
    <section className="w-full bg-cream py-16 md:py-24">
      <div className="max-w-content mx-auto px-6">
        <div className="relative mx-auto max-w-4xl xl:max-w-5xl">
          <motion.div
            layout
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden rounded-2xl bg-olive-900 h-[65vh] max-h-[520px] min-h-[320px] md:aspect-[16/10] md:h-auto md:max-h-none"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {/* Always show the blurred backdrop now — landscape images
          benefit from it too once they're object-contain'd, since
          they'll often leave empty space top/bottom on mobile. */}
                <img
                  src={current.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                />
                <img
                  src={current.src}
                  alt={current.caption}
                  className="relative h-full w-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-olive hover:bg-cream md:-left-5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-olive hover:bg-cream md:-right-5"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={current.caption}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="mt-6 text-center font-body text-xs tracking-widest2 text-olive/70"
          >
            {current.caption.toUpperCase()}
          </motion.p>
        </AnimatePresence>

        <div className="mt-5 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-olive" : "w-1.5 bg-olive/30"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}