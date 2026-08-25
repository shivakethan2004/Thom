import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import { posts } from "../../constants/links";
const INSTAGRAM_HANDLE = "thehouseofmaya.in";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

/* ---------------------------------------------------------------------
 * Leaf — matches the flourish used elsewhere on the site.
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

/*
 * ------------------------------------------------------------
 * PLACEHOLDER POST DATA
 * ------------------------------------------------------------
 * Instagram doesn't allow pulling a live feed without an official
 * Meta Graph API access token (the old public embed widgets were
 * deprecated). Until that's set up, drop in real photo exports from
 * the client's Instagram here — image + the post's permalink.
 *
 * Once a Graph API token exists, this array can be replaced with a
 * fetch() call to the Instagram Graph API media endpoint instead.
 */


export default function InstagramFeed() {
    const trackRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const scrollByAmount = (dir) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector("a");
        const step = card ? card.offsetWidth + 16 : 300;
        track.scrollBy({ left: dir * step * 2, behavior: "smooth" });
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        setAtStart(track.scrollLeft <= 4);
        setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };

    return (
        <section className="relative w-full overflow-hidden bg-cream px-6 py-16 text-olive md:px-12 md:py-24">
            {/* ---- Header ---- */}
            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
                <Leaf className="absolute left-0 top-2 hidden h-16 w-10 text-olive/30 md:block" />
                <Leaf className="absolute right-0 top-2 hidden h-16 w-10 -scale-x-100 text-olive/30 md:block" />

                <span className="font-body text-[0.65rem] tracking-widest2 text-olive/60">
                    @{INSTAGRAM_HANDLE}
                </span>
                <h2 className="mt-3 font-accent text-3xl font-light text-olive md:text-4xl">
                    From Our Instagram
                </h2>
                <p className="mt-3 max-w-md font-body text-sm text-olive/70">
                    A little more of our world, one frame at a time.
                </p>
            </div>

            {/* ---- Carousel ---- */}
            <div className="relative mx-auto mt-12 max-w-content">
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
                >
                    {posts.map((post, i) => (
                        <motion.a
                            key={i}
                            href={post.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                            className="group relative aspect-square w-[65%] flex-shrink-0 snap-start overflow-hidden rounded-xl sm:w-[38%] md:w-[28%] lg:w-[22%]"
                        >
                            <img
                                src={post.image}
                                alt="Instagram post"
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-olive-900/0 transition-colors duration-300 group-hover:bg-olive-900/30">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* ---- Arrows (desktop only) ---- */}
                <button
                    onClick={() => scrollByAmount(-1)}
                    disabled={atStart}
                    aria-label="Scroll left"
                    className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full bg-cream p-2 text-olive shadow-md transition-opacity disabled:opacity-0 md:flex"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={() => scrollByAmount(1)}
                    disabled={atEnd}
                    aria-label="Scroll right"
                    className="absolute right-0 top-1/2 hidden translate-x-4 -translate-y-1/2 rounded-full bg-cream p-2 text-olive shadow-md transition-opacity disabled:opacity-0 md:flex"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* ---- CTA ---- */}
            <div className="mt-10 flex justify-center">
                <Button href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" variant="outline">
                    Follow on Instagram
                </Button>
            </div>
        </section>
    );
}