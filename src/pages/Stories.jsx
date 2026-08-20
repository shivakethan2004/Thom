import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stories } from "../constants/links";

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

/* ---------------------------------------------------------------------
 * StoryRow — photo on one side, title/date on the other. No description
 * copy, matching the Films list layout for consistency.
 * ------------------------------------------------------------------- */
function StoryRow({ story, index }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      className="border-b border-olive/10 py-8 first:pt-0 last:border-b-0 md:py-10"
    >
      <Link
        to={story.href}
        className={`group flex flex-col gap-6 md:flex-row md:items-center md:gap-10 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="relative w-full overflow-hidden rounded-xl md:w-[45%]">
          <div className="aspect-[4/3] w-full">
            <img
              src={story.image}
              alt={story.title}
              style={{ objectPosition: story.objectPosition }}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className={`flex flex-1 flex-col items-start ${reversed ? "md:items-end md:text-right" : ""}`}>
          <span className="font-body text-[0.65rem] tracking-widest2 text-olive/50">
            {story.date}
          </span>
          <h3 className="mt-2 font-display text-2xl font-light text-olive md:text-3xl">
            {story.title}
          </h3>
          <span className="mt-4 font-body text-xs tracking-widest2 text-olive/70 transition-colors group-hover:text-olive">
            READ STORY →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Stories() {
  return (
    <section className="relative w-full overflow-hidden bg-cream px-6 py-16 text-olive md:px-12 md:py-24">
      {/* ---- Decorative corner floral ---- */}
      <img
        src="/images/3rdfloral.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-0 hidden w-56 -scale-x-100 opacity-40 md:block lg:w-72"
      />

      <div className="relative z-10 mx-auto max-w-content">
        {/* ---- Back to home ---- */}
       

        {/* ---- Header ---- */}
        <div className="relative mx-auto mt-10 flex max-w-2xl flex-col items-center text-center">
          <Leaf className="absolute left-0 top-2 hidden h-16 w-10 text-olive/30 md:block" />
          <Leaf className="absolute right-0 top-2 hidden h-16 w-10 -scale-x-100 text-olive/30 md:block" />

          <span className="font-body text-[0.65rem] tracking-widest2 text-olive/60">STORIES</span>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight md:text-6xl">
            Our Stories
          </h1>
          <p className="mt-4 max-w-md font-body text-sm text-olive/70 md:text-base">
            Real moments, honest emotions, timeless memories.
          </p>
        </div>

        {/* ---- Story list ---- */}
        <div className="mx-auto mt-14 max-w-3xl md:mt-20">
          {stories.map((story, index) => (
            <StoryRow key={story.title} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
