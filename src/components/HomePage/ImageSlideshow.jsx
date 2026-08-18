import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slideshowImages } from "../../constants/links";

export default function ImageSlideshow({ interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const orientationCache = useRef({});
  const [orientation, setOrientation] = useState("landscape");

  const goTo = useCallback((i) => {
    setDirection(i > index ? 1 : -1);
    setIndex((i + slideshowImages.length) % slideshowImages.length);
  }, [index]);

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [index, interval]);

  const current = slideshowImages[index];

  useEffect(() => {
    setOrientation(orientationCache.current[current.src] || "landscape");
  }, [current.src]);

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const detected = naturalHeight > naturalWidth ? "portrait" : "landscape";
    orientationCache.current[current.src] = detected;
    setOrientation(detected);
  };

  const isPortrait = orientation === "portrait";

  return (
    <section className="w-full bg-cream py-16 md:py-24">
      <div className="max-w-content mx-auto px-6">
        <div className="relative mx-auto max-w-3xl">
          {/*
            `layout` tells framer-motion to smoothly interpolate this
            element's size/position whenever its rendered height changes
            between renders — instead of the box snapping instantly when
            aspect-[16/10] swaps for h-[70vh].
          */}
          <motion.div
            layout
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full overflow-hidden rounded-2xl bg-cream ${
              isPortrait ? "h-[70vh] max-h-[640px]" : "aspect-[16/10]"
            }`}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.caption}
                onLoad={handleImageLoad}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 h-full w-full ${
                  isPortrait ? "object-contain" : "object-cover"
                }`}
                loading="eager"
                decoding="async"
              />
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
          {slideshowImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-olive" : "w-1.5 bg-olive/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}