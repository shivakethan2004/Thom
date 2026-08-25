import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GalleryEmbed from "../components/Gallery/GalleryEmbed";
import { getGalleryBySlug } from "../constants/stories/galleries";

// ...Leaf component stays the same...
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

export default function StoryDetail() {
  const { slug } = useParams();
  const story = getGalleryBySlug(slug);

  return (
    <section className="relative w-full overflow-hidden bg-cream px-6 py-16 text-olive md:px-12 md:py-24">
      {/* ...decorative floral stays the same... */}

      <div className="relative z-10 mx-auto max-w-content">
       
        <div className="relative mx-auto mt-10 flex max-w-2xl flex-col items-center text-center">
          <Leaf className="absolute left-0 top-2 hidden h-16 w-10 text-olive/30 md:block" />
          <Leaf className="absolute right-0 top-2 hidden h-16 w-10 -scale-x-100 text-olive/30 md:block" />

         

          <span className="mt-4 font-body text-[0.65rem] tracking-widest2 text-olive/60">
            {story.subtitle.toUpperCase()}
          </span>
          <h1 className="mt-2 font-accent text-4xl font-light tracking-tight md:text-6xl">
            {story.name}
          </h1>
          <p className="mt-3 font-body text-sm text-olive/70 md:text-base">{story.date}</p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl md:mt-20">
          <GalleryEmbed
            slideshowId={story.slideshowId}
            scriptSrc={story.scriptSrc}
            title={story.name}
            subtitle={story.subtitle}
            date={story.date}
          />
        </div>
      </div>
    </section>
  );
}