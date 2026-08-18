import { Link } from "react-router-dom";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
const VARIANTS = {
  solid: "bg-cream text-olive hover:bg-sand",
  outline: "border border-olive text-olive hover:bg-olive hover:text-cream",
};

function isExternalHref(href) {
  if (!href) return false;
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

export default function Button({
  as,
  href,
  variant = "solid",
  showIcon = true,
  className,
  children,
  ...props
}) {
  const classes = twMerge(
    clsx(
      "inline-flex items-center gap-2 rounded-full px-7 py-3.5",
      "font-body text-sm tracking-wide transition-colors duration-300",
      VARIANTS[variant]
    ),
    className
  );

  // Explicit override, e.g. as="button" for a submit action
  if (as) {
    const Tag = as;
    return (
      <Tag className={classes} {...props}>
        {children}
        {showIcon && <ArrowUpRight size={16} strokeWidth={2} />}
      </Tag>
    );
  }

  // Internal route → client-side navigation, no reload
  if (href && !isExternalHref(href)) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
        {showIcon && <ArrowUpRight size={16} strokeWidth={2} />}
      </Link>
    );
  }

  // External / mailto / tel / anchor → real <a>
  if (href) {
    const external = !href.startsWith("#");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...props}
      >
        {children}
        {showIcon && <ArrowUpRight size={16} strokeWidth={2} />}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {showIcon && <ArrowUpRight size={16} strokeWidth={2} />}
    </button>
  );
}