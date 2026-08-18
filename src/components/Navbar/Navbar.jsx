import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, cta, routes } from "../../constants/links";
import { site, nav } from "../../constants/text";
import Button from "../ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-cream">
      <div className="max-w-content mx-auto flex items-center justify-between px-6 md:px-12 py-5">
        <Link to={routes.home} className="flex flex-col leading-none">
          <span className="text-3xl text-olive font-body">{site.name}</span>
          <span className="font-body text-[0.65rem] tracking-widest2 text-olive/70 mt-1">
            {site.tagline.toUpperCase()}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map(({ key, href }) => (
            <NavLink
              key={key}
              to={href}
              className={({ isActive }) =>
                `font-display font-medium text-sm tracking-wide transition-colors ${
                  isActive ? "text-olive" : "text-olive/60 hover:text-olive"
                }`
              }
            >
              {nav.links[key]}
            </NavLink>
          ))}
        </nav>

        <Button href={cta.primary} variant="outline" className="hidden sm:inline-flex">
          {nav.cta}
        </Button>

        <button
          className="lg:hidden text-olive"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden flex flex-col gap-6 px-6 pb-8 bg-cream">
          {navLinks.map(({ key, href }) => (
            <NavLink
              key={key}
              to={href}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-display text-base ${isActive ? "text-olive" : "text-olive/70"}`
              }
            >
              {nav.links[key]}
            </NavLink>
          ))}
          <Button href={cta.primary} variant="outline" className="w-fit">
            {nav.cta}
          </Button>
        </nav>
      )}
    </header>
  );
}