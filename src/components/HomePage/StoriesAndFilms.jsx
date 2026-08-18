import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import Button from "../ui/Button";
import { stories, films, cta } from "../../constants/links";
function Leaf({ className }) {
  return (
    <svg viewBox="0 0 24 60" fill="none" className={className}>
      <path
        d="M12 2C7 10 4 18 4 30s3 20 8 28"
        stroke="currentColor"
        strokeWidth="1"
      />
      {[10, 20, 30, 40, 50].map((y, i) => (
        <path
          key={i}
          d={`M${5 + (i % 2)} ${y}q7-3 9 4`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------
 * FloralSprig — a small botanical accent, anchored at the base of the
 * story arch rather than encircling it. Same thin-line, single-stroke
 * language as Leaf, just a fuller cluster (stem + small leaves + a
 * couple of bud shapes) so it reads as an intentional flourish rather
 * than a stray branch.
 * ------------------------------------------------------------------- */
function FloralSprig({ className, flip = false }) {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* main stem, curving up from the base point */}
      <path
        d="M4 38C10 30 14 24 26 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* small leaf pairs along the stem */}
      <path d="M8 34q5-2 6 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M13 28q5-1 5 4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M18 22q5-1 4 4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      {/* small bud/flower shapes at the tip */}
      <circle cx="27" cy="12" r="1.6" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="32" cy="9" r="1.1" stroke="currentColor" strokeWidth="0.8" />
      <path d="M26 13q-6 2-9 8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------------
 * FilmCard
 * ------------------------------------------------------------------- */
function FilmCard({ film }) {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://vumbnail.com/${film.vimeoId}.jpg`;

  return (
    <motion.div
      layout
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-xl bg-olive-800 ${
        playing ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {playing && (
        <button
          onClick={() => setPlaying(false)}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-olive-900/70 text-cream transition-colors hover:bg-olive-900"
        >
          <X size={16} />
        </button>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="group relative block aspect-video w-full text-left"
          >
            <img
              src={thumbnailUrl}
              alt={film.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-olive-900/30 transition-colors duration-300 group-hover:bg-olive-900/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-olive transition-transform duration-300 group-hover:scale-110">
                <Play size={18} fill="currentColor" />
              </span>
            </div>
            <div className="absolute bottom-3 left-3">
              <p className="font-body text-[0.6rem] tracking-widest2 text-cream/80">
                {film.category}
              </p>
              <p className="font-display text-sm text-cream">{film.title}</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StoriesAndFilms() {
  return (
    <section className="w-full bg-olive-800 py-16 md:py-24">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="rounded-2xl bg-cream px-6 py-14 md:px-14 md:py-16">

          {/* ---- Stories header ---- */}
          <div className="relative flex flex-col items-center text-center">
            <Leaf className="absolute left-0 top-2 hidden h-16 w-10 text-olive/30 md:block" />
            <Leaf className="absolute right-0 top-2 hidden h-16 w-10 -scale-x-100 text-olive/30 md:block" />

            <span className="font-body text-[0.65rem] tracking-widest2 text-olive/60">
              STORIES
            </span>
            <h2 className="mt-3 font-display text-3xl font-light text-olive md:text-4xl">
              Our Latest Stories
            </h2>
            <p className="mt-3 max-w-md font-body text-sm text-olive/70">
              Real moments, honest emotions, timeless memories.
            </p>
          </div>

          {/* ---- Stories grid — arch photo + base floral accent ---- */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8">
            {stories.map((story) => (
              <Link
                key={story.title}
                href={story.href}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52">
                  <div className="h-full w-full overflow-hidden rounded-t-full">
                    <img
                      src={story.image}
                      alt={story.title}
                      style={{ objectPosition: story.objectPosition }}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Floral sprigs anchored at the base, tucked slightly
                      behind the arch edge on each side */}
                  <FloralSprig className="pointer-events-none absolute -bottom-2 -left-3 h-10 w-14 text-olive/50" />
                  <FloralSprig
                    flip
                    className="pointer-events-none absolute -bottom-2 -right-3 h-10 w-14 text-olive/50"
                  />
                </div>
                <span className="mt-5 font-body text-[0.65rem] tracking-widest2 text-olive/50">
                  {story.date}
                </span>
                <h3 className="mt-1 font-display text-base font-normal text-olive">
                  {story.title}
                </h3>
                <span className="mt-2 font-body text-xs tracking-wide text-olive/70 transition-colors group-hover:text-olive">
                  Read story →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button href={cta.stories} variant="outline">
              View all stories
            </Button>
          </div>

          {/* ---- Divider ---- */}
          <div className="my-14 border-t border-olive/15" />

          {/* ---- Films header ---- */}
          <div className="flex flex-col items-center text-center">
            <span className="font-body text-[0.65rem] tracking-widest2 text-olive/60">
              FILMS
            </span>
            <h2 className="mt-3 font-display text-3xl font-light text-olive md:text-4xl">
              Our Films
            </h2>
            <p className="mt-3 max-w-md font-body text-sm text-olive/70">
              Cinematic tales of love, emotion and moments that move.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {films.map((film) => (
              <FilmCard key={film.vimeoId} film={film} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button href={cta.films} variant="outline">
              View all films
            </Button>
          </div>
        </div>

        {/* ---- CTA below panel ---- */}
        <div className="mt-14 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cream/30">
            <span className="font-display text-sm text-cream">HM</span>
          </div>
          <p className="mt-4 font-body text-[0.65rem] tracking-widest2 text-cream/70">
            START YOUR JOURNEY
          </p>
          <h3 className="mt-3 font-display text-2xl font-light text-cream md:text-3xl">
            Let's create something beautiful
          </h3>
        </div>
      </div>
    </section>
  );
}