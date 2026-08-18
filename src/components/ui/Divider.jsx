/**
 * Divider
 * -----------------------------------------------------------------------
 * Two hairlines flanking a small leaf ornament — the flourish under the
 * hero title. Pure SVG so it stays crisp at any size and inherits color
 * via `currentColor`.
 * -----------------------------------------------------------------------
 */

export default function Divider({ tone = "text-cream", className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${tone} ${className}`}>
      <span className="h-px w-11 bg-current opacity-70" />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12Z"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.9"
        />
        <path d="M12 6v14" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      </svg>
      <span className="h-px w-11 bg-current opacity-70" />
    </div>
  );
}