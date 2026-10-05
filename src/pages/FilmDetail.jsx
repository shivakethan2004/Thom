import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPublicFilmById } from "../config/publicContent";

export default function FilmDetail() {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getPublicFilmById(filmId)
      .then((item) => {
        if (!cancelled) setFilm(item);
      })
      .catch((loadError) => {
        console.error("Unable to load the shared film.", loadError);
        if (!cancelled) {
          setFilm(null);
          setError("This film couldn't be loaded. Please try again later.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filmId]);

  return (
    <section className="min-h-[70vh] w-full bg-cream px-6 py-16 text-olive md:px-12 md:py-24">
      <div className="mx-auto max-w-content">
        <Link
          to="/films"
          className="inline-flex items-center gap-2 font-body text-sm text-olive/65 transition-colors hover:text-olive"
        >
          <ArrowLeft size={16} />
          All films
        </Link>

        {loading ? (
          <p className="mt-12 text-center font-body text-sm text-olive/60">Loading film…</p>
        ) : error ? (
          <p role="alert" className="mt-12 text-center font-body text-sm text-red-700">
            {error}
          </p>
        ) : !film?.vimeoId ? (
          <div className="mt-12 text-center">
            <h1 className="font-accent text-3xl font-light">Film not found</h1>
            <p className="mt-3 font-body text-sm text-olive/65">
              This film may have been removed.
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-5xl">
            <p className="text-center font-body text-[0.65rem] tracking-widest2 text-olive/55">
              {film.category}
            </p>
            <h1 className="mt-3 text-center font-accent text-3xl font-light md:text-5xl">
              {film.title}
            </h1>
            <div className="mt-8 aspect-video overflow-hidden rounded-xl bg-olive-900">
              <iframe
                title={film.title}
                src={`https://player.vimeo.com/video/${film.vimeoId}${film.vimeoHash ? `?h=${encodeURIComponent(film.vimeoHash)}` : ""}`}
                className="h-full w-full"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
