import clsx from "clsx";

/**
 * Text
 * -----------------------------------------------------------------------
 * Body copy in the NCL Gasdrifo utility face. `tone` controls color so
 * paragraphs on dark hero imagery vs. light sections stay readable
 * without repeating color classes everywhere.
 * -----------------------------------------------------------------------
 */

const TONES = {
  olive: "text-olive",
  cream: "text-cream",
  grey: "text-grey",
  muted: "text-olive/70",
  "muted-cream": "text-cream/80",
};

const SIZES = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg md:text-xl",
};

export default function Text({
  as: Tag = "p",
  size = "base",
  tone = "olive",
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={clsx("font-body leading-relaxed", SIZES[size], TONES[tone], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}