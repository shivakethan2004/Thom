import clsx from "clsx";

/**
 * Kicker
 * -----------------------------------------------------------------------
 * The small, wide-tracked uppercase label used above headlines
 * (e.g. "CINEMATIC • INTIMATE • TIMELESS"). Centralized here so the
 * letter-spacing/size treatment stays identical everywhere it's used.
 * -----------------------------------------------------------------------
 */

const TONES = {
  olive: "text-olive",
  cream: "text-cream",
  sand: "text-sand",
};

export default function Kicker({ tone = "cream", className, children, ...props }) {
  return (
    <span
      className={clsx(
        "font-body block text-xs md:text-sm uppercase tracking-widest2 font-medium",
        TONES[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}