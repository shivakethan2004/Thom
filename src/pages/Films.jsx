import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { films, routes, cta } from "../constants/links";

/* -----------------------------------------------------------------------
 * FilmRow
 * -----------------------------------------------------------------------
 * One wide film entry: a big playable thumbnail on one side, a text
 * panel with the title/description/CTA on the other. Clicking the
 * thumbnail swaps it for an inline Vimeo player, same pattern used by
 * the homepage FilmCard.
 * ---------------------------------------------------------------------- */
function FilmRow({ film, index }) {
  const cardRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://vumbnail.com/${film.vimeoId}.jpg`;
  const reversed = index % 2 === 1;

  useEffect(() => {
    if (playing && cardRef.current) {
      const id = requestAnimationFrame(() => {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [playing]);

  return (
    <div
      ref={cardRef}
      className={`grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8 lg:gap-10 ${
        reversed ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* ---- Video ---- */}
      <div className="md:col-span-3 md:[direction:ltr]">
        <motion.div
          layout
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-sm bg-olive-800"
        >
          {playing && (
            <button
              onClick={() => setPlaying(false)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-olive-900/70 text-cream transition-colors hover:bg-olive-900"
            >
              <X size={16} />
            </button>
          )}

          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.div
                key="player"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-video w-full"
              >
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
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="group relative block aspect-video w-full text-left"
              >
                <img
                  src={thumbnailUrl}
                  alt={film.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-olive-900/25 transition-colors duration-300 group-hover:bg-olive-900/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 text-olive shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                    <Play size={20} fill="currentColor" />
                  </span>
                </div>
                {film.duration && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-olive-900/70 px-2.5 py-1 font-body text-[11px] tracking-wide text-cream">
                    {film.duration}
                  </span>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---- Info panel ---- */}
      <div className="relative flex items-center md:col-span-2 md:[direction:ltr]">
        <div className="relative w-full rounded-sm bg-olive-50/70 px-7 py-8 md:px-9 md:py-10">
          <img
            src="/images/floral2.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-6 w-16 rotate-12 opacity-40 md:w-20"
          />

          <p className="font-body text-[10px] tracking-widest2 text-olive/50">
            {film.category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-light text-olive md:text-3xl">
            {film.title}
          </h3>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-olive/70">
            {film.description}
          </p>

          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="mt-6 inline-flex items-center gap-2 font-body text-xs tracking-widest2 text-olive/80 transition-colors hover:text-olive"
          >
            WATCH FILM <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Films() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-20 text-olive md:px-10 lg:py-28">
      {/* ---- Decorative floral, top right ---- */}
      <img
        src="/images/floral2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-0 w-40 opacity-70 md:w-56 lg:w-64"
      />

      <div className="relative mx-auto max-w-content">
        {/* ---- Back link ---- */}
        <Link
          to={routes.home}
          className="inline-flex items-center gap-2 font-body text-xs tracking-widest2 text-olive/60 transition-colors hover:text-olive"
        >
          <ArrowLeft size={14} /> BACK TO HOME
        </Link>

        {/* ---- Header ---- */}
        <div className="mt-10 text-center">
          <span className="font-body text-[11px] tracking-widest2 text-olive/60">
            FILMS
          </span>
          <h1 className="mt-4 font-display text-5xl font-light tracking-tight md:text-6xl lg:text-7xl">
            Our Films
          </h1>
          <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-olive/70 md:text-base">
            Cinematic tales of love, emotion and moments that move.
          </p>
        </div>

        {/* ---- Film rows ---- */}
        <div className="mt-16 flex flex-col gap-14 md:mt-20 md:gap-16">
          {films.map((film, i) => (
            <FilmRow key={film.vimeoId} film={film} index={i} />
          ))}
        </div>

        {/* ---- Footer CTA ---- */}
        <div className="mt-20 flex flex-col items-center gap-6 text-center md:mt-24">
          <div className="h-px w-16 bg-sand" />
          <p className="font-body text-sm text-olive/70">
            More films. More stories. More memories.
          </p>
          <Button
            href={cta.primary}
            variant="solid"
            className="bg-olive text-cream hover:bg-olive-700"
          >
            Explore More Films
          </Button>
        </div>
      </div>
    </section>
  );
}
