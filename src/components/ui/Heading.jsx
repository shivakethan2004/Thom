import clsx from "clsx";

/**
 * Heading
 * -----------------------------------------------------------------------
 * Wraps h1–h4 with the accent font (Bodoni Moda) and a shared size scale
 * so every headline in the app stays consistent. Pass `as` to control which
 * tag renders (semantics) independent of `size` (visual weight).
 *
 * <Heading as="h1" size="xl">Every Love Story</Heading>
 * -----------------------------------------------------------------------
 */

const SIZES = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-6xl",
  "2xl": "text-5xl md:text-7xl",
};

export default function Heading({
  as: Tag = "h2",
  size = "lg",
  weight = "font-light",
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={clsx(
        "font-accent leading-[1.1] tracking-tight text-olive",
        SIZES[size],
        weight,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}