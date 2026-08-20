import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { stories, routes } from "../constants/links";

/* -----------------------------------------------------------------------
 * StoryRow
 * -----------------------------------------------------------------------
 * A large photo (category / title / date overlaid at the bottom) beside
 * a light text panel with a short description and a "View Story" link.
 *
 * NOTE: individual story detail pages (/stories/:id) don't exist yet, so
 * this renders as a static row rather than a Link — swap the outer <div>
 * for a <Link to={story.href}> once those routes are built.
 * ---------------------------------------------------------------------- */
function StoryRow({ story }) {
  return (
    <div className="group grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6 lg:gap-8">
      {/* ---- Photo ---- */}
      <div className="relative overflow-hidden rounded-sm md:col-span-3">
        <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
          <img
            src={story.image}
            alt={story.title}
            style={{ objectPosition: story.objectPosition }}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-900/70 via-olive-900/10 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-7">
          <p className="font-body text-[10px] tracking-widest2 text-cream/80">
            {story.category}
          </p>
          <h3 className="mt-2 font-display text-2xl font-light text-cream sm:text-3xl">
            {story.title}
          </h3>
          <p className="mt-1 font-body text-[11px] tracking-wide text-cream/70">
            {story.date}
          </p>
        </div>
      </div>

      {/* ---- Info panel ---- */}
      <div className="relative flex items-center md:col-span-2">
        <div className="relative w-full rounded-sm bg-olive-50/70 px-7 py-8 md:px-9 md:py-10">
          <img
            src="/images/floral2.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-6 w-16 rotate-12 opacity-40 md:w-20"
          />

          <p className="max-w-sm font-body text-sm leading-relaxed text-olive/70">
            {story.description}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 font-body text-xs tracking-widest2 text-olive/80 transition-colors group-hover:text-olive">
            VIEW STORY <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Stories() {
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
            STORIES
          </span>
          <h1 className="mt-4 font-display text-5xl font-light tracking-tight md:text-6xl lg:text-7xl">
            Our Stories
          </h1>
          <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-olive/70 md:text-base">
            Real moments. Honest emotions. Timeless memories.
          </p>
        </div>

        {/* ---- Story rows ---- */}
        <div className="mt-16 flex flex-col gap-10 md:mt-20 md:gap-12">
          {stories.map((story) => (
            <StoryRow key={story.title} story={story} />
          ))}
        </div>

        {/* ---- Footer CTA ---- */}
        <div className="mt-20 flex flex-col items-center gap-6 text-center md:mt-24">
          <div className="h-px w-16 bg-sand" />
          <p className="font-body text-sm text-olive/70">
            More stories. More memories.
          </p>
          <Button
            href={routes.contact}
            variant="solid"
            className="bg-olive text-cream hover:bg-olive-700"
          >
            Load More Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
