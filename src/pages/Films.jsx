import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { films } from "../constants/links";

/* ---------------------------------------------------------------------
 * Leaf — small decorative flourish flanking the page kicker, matching
 * the mark already used in HomePage/StoriesAndFilms.jsx.
 * ------------------------------------------------------------------- */
function Leaf({ className }) {
  return (
    <svg viewBox="0 0 24 60" fill="none" className={className}>
      <path d="M12 2C7 10 4 18 4 30s3 20 8 28" stroke="currentColor" strokeWidth="1" />
      {[10, 20, 30, 40, 50].map((y, i) => (
        <path key={i} d={`M${5 + (i % 2)} ${y}q7-3 9 4`} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

function formatDuration(totalSeconds) {
  if (!totalSeconds && totalSeconds !== 0) return null;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/* ---------------------------------------------------------------------
 * FilmRow — thumbnail + play/inline-player on the left, title/category
 * on the right. No description copy, per the current design.
 * ------------------------------------------------------------------- */
function FilmRow({ film, index }) {
  const rowRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(film.duration ?? null);

  const thumbnailUrl = `https://vumbnail.com/${film.vimeoId}.jpg`;

  useEffect(() => {
    if (duration !== null) return;
    let cancelled = false;

    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${film.vimeoId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.duration) {
          setDuration(formatDuration(data.duration));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [film.vimeoId, duration]);

  useEffect(() => {
    if (playing && rowRef.current) {
      const id = requestAnimationFrame(() => {
        rowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [playing]);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="border-b border-olive/10 py-10 first:pt-0 last:border-b-0 md:py-14"
    >
      <div className="flex flex-col gap-6">
        {/* ---- Thumbnail / inline player ---- */}
        <div className="relative w-full overflow-hidden rounded-xl bg-olive-800">
          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.div
                key="player"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-video w-full"
              >
                <button
                  onClick={() => setPlaying(false)}
                  aria-label="Close video"
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-olive-900/70 text-cream transition-colors hover:bg-olive-900"
                >
                  <X size={16} />
                </button>
                <iframe
                  title={film.title}
                  src={`https://player.vimeo.com/video/${film.vimeoId}?h=${film.vimeoHash}&autoplay=1`}
                  className="h-full w-full"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                />
              </motion.div>
            ) : (
              <motion.button
                key="poster"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${film.title}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative block aspect-video w-full text-left"
              >
                <img
                  src={thumbnailUrl}
                  alt={film.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-olive-900/25 transition-colors duration-300 group-hover:bg-olive-900/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 text-olive shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play size={20} fill="currentColor" />
                  </span>
                </div>
                {duration && (
                  <span className="absolute bottom-3 right-3 rounded bg-olive-900/70 px-2 py-1 font-body text-[0.65rem] tracking-wide text-cream">
                    {duration}
                  </span>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ---- Title / category ---- */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="font-body text-[0.65rem] tracking-widest2 text-olive/50">
              {film.category}
            </span>
            <h3 className="mt-2 font-display text-2xl font-light text-olive md:text-3xl">
              {film.title}
            </h3>
          </div>
          <button
            onClick={() => setPlaying(true)}
            className="font-body text-xs tracking-widest2 text-olive/70 transition-colors hover:text-olive"
          >
            WATCH FILM →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Films() {
  return (
    <section className="relative w-full overflow-hidden bg-cream px-6 py-16 text-olive md:px-12 md:py-24">
      {/* ---- Decorative corner floral ---- */}
      <img
        src="/images/3rdfloral.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 hidden w-56 opacity-40 md:block lg:w-72"
      />

      <div className="relative z-10 mx-auto max-w-content">
        {/* ---- Back to home ---- */}
     

        {/* ---- Header ---- */}
        <div className="relative mx-auto mt-10 flex max-w-2xl flex-col items-center text-center">
          <Leaf className="absolute left-0 top-2 hidden h-16 w-10 text-olive/30 md:block" />
          <Leaf className="absolute right-0 top-2 hidden h-16 w-10 -scale-x-100 text-olive/30 md:block" />

          <span className="font-body text-[0.65rem] tracking-widest2 text-olive/60">FILMS</span>
          <h1 className="mt-4 font-accent text-4xl font-light tracking-tight md:text-6xl">
            Our Films
          </h1>
          <p className="mt-4 max-w-md font-body text-sm text-olive/70 md:text-base">
            Cinematic tales of love, emotion and moments that move.
          </p>
        </div>

        {/* ---- Film list ---- */}
        <div className="mx-auto mt-14 max-w-4xl md:mt-20">
          {films.map((film, index) => (
            <FilmRow key={film.vimeoId} film={film} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
