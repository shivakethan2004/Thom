import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import GalleryEmbed from "../components/Gallery/GalleryEmbed";
import { getGalleryBySlug } from "../constants/stories/galleries";

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

function GalleryLoadingSkeleton() {
  return (
    <div className="flex aspect-[4/5] w-full animate-pulse flex-col items-center justify-center rounded-md bg-olive/10 md:aspect-video">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-olive/30 border-t-olive/70" />
      <p className="mt-4 font-body text-xs tracking-widest2 text-olive/50">
        LOADING GALLERY…
      </p>
    </div>
  );
}

export default function StoryDetail() {
  const { slug } = useParams();
  const story = getGalleryBySlug(slug);
  const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);
  const [hasGalleryError, setHasGalleryError] = useState(false);

  useEffect(() => {
    setIsGalleryLoaded(false);
    setHasGalleryError(false);
  }, [slug]);

  useEffect(() => {
    if (isGalleryLoaded) return;
    const timeout = setTimeout(() => setIsGalleryLoaded(true), 6000);
    return () => clearTimeout(timeout);
  }, [isGalleryLoaded, slug]);

  // Stable references — these must NOT change identity on every render,
  // or GalleryEmbed's effect (if it depended on them) would re-run and
  // re-inject the script. Even without that dependency, useCallback here
  // keeps things predictable.
  const handleGalleryLoad = useCallback(() => {
    setIsGalleryLoaded(true);
  }, []);

  const handleGalleryError = useCallback(() => {
    setIsGalleryLoaded(true);
    setHasGalleryError(true);
  }, []);

  if (!story) {
    return (
      <section className="relative w-full overflow-hidden bg-cream px-6 py-16 text-olive md:px-12 md:py-24">
        <div className="relative z-10 mx-auto max-w-content text-center">
          <h1 className="font-accent text-3xl font-light">Story not found</h1>
          <Link
            to="/stories"
            className="mt-6 inline-flex items-center gap-2 font-body text-sm text-olive/70 hover:text-olive"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to stories
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-cream px-6 py-16 text-olive md:px-12 md:py-24">
      {/* ...decorative floral stays the same... */}

      <div className="relative z-10 mx-auto max-w-content">

        {/* <div className="relative mx-auto mt-10 flex max-w-2xl flex-col items-center text-center">
          <Leaf className="absolute left-0 top-2 hidden h-16 w-10 text-olive/30 md:block" />
          <Leaf className="absolute right-0 top-2 hidden h-16 w-10 -scale-x-100 text-olive/30 md:block" />

          <span className="mt-4 font-body text-[0.65rem] tracking-widest2 text-olive/60">
            {story.subtitle.toUpperCase()}
          </span>
          <h1 className="mt-2 font-accent text-4xl font-light tracking-tight md:text-6xl">
            {story.name}
          </h1>
          <p className="mt-3 font-body text-sm text-olive/70 md:text-base">{story.date}</p>
        </div> */}

        <div className="mx-auto mt-14 max-w-4xl md:mt-20">
          {!isGalleryLoaded && <GalleryLoadingSkeleton />}

          {hasGalleryError && (
            <p className="mt-4 text-center font-body text-sm text-olive/60">
              This gallery couldn't be loaded. Please try refreshing the page.
            </p>
          )}

          <div className={isGalleryLoaded ? "block" : "hidden"}>
            <GalleryEmbed
              slideshowId={story.slideshowId}
              scriptSrc={story.scriptSrc}
              title={story.name}
              subtitle={story.subtitle}
              date={story.date}
              onLoad={handleGalleryLoad}
              onError={handleGalleryError}
            />
          </div>
        </div>
      </div>
    </section>
  );
}