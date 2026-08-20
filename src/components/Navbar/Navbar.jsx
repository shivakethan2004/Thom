import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, cta, routes } from "../../constants/links";
import { site, nav } from "../../constants/text";
import Button from "../ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // First 3 links → left
  // Remaining 2 links → right
  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-transparent">
      <div className="max-w-content mx-auto relative px-6 md:px-12 py-5">

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center">

          {/* ================= LEFT ================= */}
          <nav className="flex items-center justify-end gap-10 pr-16">
            {leftLinks.map(({ key, href }) => (
              <NavLink
                key={key}
                to={href}
                className={({ isActive }) =>
                  `font-display font-medium text-sm tracking-wide transition-colors ${
                    isActive
                      ? "text-olive"
                      : "text-olive/60 hover:text-olive"
                  }`
                }
              >
                {nav.links[key]}
              </NavLink>
            ))}
          </nav>

          {/* ================= CENTER LOGO ================= */}
          <Link
            to={routes.home}
            className="
              flex
              items-center
              justify-center
              whitespace-nowrap
              z-10
            "
          >
            <img
              src="/images/logotext.svg"
              alt={site.name}
              className="w-[150px] h-auto"
            />
          </Link>

          {/* ================= RIGHT ================= */}
          <nav className="flex items-center justify-start gap-10 pl-16">
            {rightLinks.map(({ key, href }) => (
              <NavLink
                key={key}
                to={href}
                className={({ isActive }) =>
                  `font-display font-medium text-sm tracking-wide transition-colors ${
                    isActive
                      ? "text-olive"
                      : "text-olive/60 hover:text-olive"
                  }`
                }
              >
                {nav.links[key]}
              </NavLink>
            ))}

            <Button
              href={cta.primary}
              variant="outline"
            >
              {nav.cta}
            </Button>
          </nav>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <div className="lg:hidden flex items-center justify-between">

          {/* MOBILE LOGO */}
          <Link
            to={routes.home}
            className="
              flex
              items-center
              justify-center
              whitespace-nowrap
            "
          >
            <img
              src="/images/logotext.svg"
              alt={site.name}
              className="w-[125px] h-auto"
            />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="text-olive"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <nav className="lg:hidden flex flex-col gap-6 px-6 pb-8 pt-4 bg-cream">

          {navLinks.map(({ key, href }) => (
            <NavLink
              key={key}
              to={href}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-display text-base ${
                  isActive
                    ? "text-olive"
                    : "text-olive/70"
                }`
              }
            >
              {nav.links[key]}
            </NavLink>
          ))}

          <Button
            href={cta.primary}
            variant="outline"
            className="w-fit"
          >
            {nav.cta}
          </Button>

        </nav>
      )}
    </header>
  );
}