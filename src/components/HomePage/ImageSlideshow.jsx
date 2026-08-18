import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slideshowImages } from "../../constants/links";

export default function ImageSlideshow({ interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [orientations, setOrientations] = useState({});
  const [ready, setReady] = useState(false);

  const goTo = useCallback((i) => {
    setDirection(i > index ? 1 : -1);
    setIndex((i + slideshowImages.length) % slideshowImages.length);
  }, [index]);

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Preload every slide once on mount and record its orientation up
  // front. This means by the time a given slide is shown, we already
  // know whether it's portrait or landscape — no waiting on that
  // slide's own onLoad, which was causing the container to render at
  // the previous slide's size and then suddenly snap/resize once the
  // new image finished loading.
  useEffect(() => {
    let cancelled = false;
    const results = {};
    let loadedCount = 0;

    slideshowImages.forEach((img, i) => {
      const probe = new Image();
      probe.src = img.src;
      probe.onload = () => {
        if (cancelled) return;
        results[i] =
          probe.naturalHeight > probe.naturalWidth ? "portrait" : "landscape";
        loadedCount += 1;
        // Update incrementally so the first slide can render as soon as
        // its own orientation is known, without waiting on every image.
        setOrientations((prev) => ({ ...prev, [i]: results[i] }));
        if (loadedCount === slideshowImages.length) setReady(true);
      };
      probe.onerror = () => {
        if (cancelled) return;
        results[i] = "landscape";
        loadedCount += 1;
        setOrientations((prev) => ({ ...prev, [i]: "landscape" }));
        if (loadedCount === slideshowImages.length) setReady(true);
      };
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [index, interval]);

  const current = slideshowImages[index];
  // Default to landscape only as a first-paint fallback before preload
  // resolves; in practice this is only visible for a frame or two.
  const isPortrait = orientations[index] === "portrait";

  return (
    <section className="w-full bg-cream py-16 md:py-24">
      <div className="max-w-content mx-auto px-6">
        <div className="relative mx-auto max-w-4xl xl:max-w-5xl">
          <motion.div
            layout
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full overflow-hidden rounded-2xl bg-olive-900 ${
              isPortrait ? "h-[70vh] max-h-[640px]" : "aspect-[16/10]"
            }`}
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
                {/* Soft blurred backdrop clone — fills the frame behind
                    portrait images so there's no flat empty space on
                    the sides, without affecting layout/sizing. */}
                {isPortrait && (
                  <img
                    src={current.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                  />
                )}
                <img
                  src={current.src}
                  alt={current.caption}
                  className={`relative h-full w-full ${
                    isPortrait ? "object-contain" : "object-cover"
                  }`}
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