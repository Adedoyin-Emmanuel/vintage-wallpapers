import { useEffect, useState } from "react";
import { Heart, Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useFavorites } from "../lib/favorites";

type Props = {
  onOpenFavorites: () => void;
  onOpenSearch: () => void;
};

export function Header({ onOpenFavorites, onOpenSearch }: Props) {
  const { count } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-close the mobile menu if the viewport grows to md+ (768px).
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const mql = window.matchMedia("(min-width: 768px)");
    const handle = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="border-b-[3px] border-border bg-background sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
          <a
            href="#gallery"
            className="px-3 py-2 hover:bg-mustard hover:text-foreground transition-colors cursor-pointer"
          >
            Gallery
          </a>
          <a
            href="#collections"
            className="px-3 py-2 hover:bg-mustard hover:text-foreground transition-colors cursor-pointer"
          >
            Collections
          </a>
          <a
            href="#archive"
            className="px-3 py-2 hover:bg-mustard hover:text-foreground transition-colors cursor-pointer"
          >
            Archive
          </a>
          <Link
            to="/about"
            className="px-3 py-2 hover:bg-mustard hover:text-foreground transition-colors cursor-pointer"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search the archive"
            onClick={onOpenSearch}
            className="hidden sm:inline-flex items-center gap-2 cursor-pointer border-[3px] border-border bg-background pl-2 pr-2.5 py-2 shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
          >
            <Search className="w-4 h-4" strokeWidth={2.5} />
            <kbd className="hidden lg:inline-flex items-center font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/55">
              ⌘K
            </kbd>
          </button>
          {/* Mobile-only compact search button */}
          <button
            type="button"
            aria-label="Search the archive"
            onClick={onOpenSearch}
            className="sm:hidden cursor-pointer border-[3px] border-border bg-background p-2 shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
          >
            <Search className="w-4 h-4" strokeWidth={2.5} />
          </button>

          {/* Favorites button with count badge */}
          <button
            type="button"
            onClick={onOpenFavorites}
            aria-label={`Open favorites (${count})`}
            className="relative cursor-pointer border-[3px] border-border bg-background p-2 shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                count > 0 ? "fill-brick text-brick" : ""
              }`}
              strokeWidth={2.5}
            />
            {count > 0 && (
              <span
                aria-hidden
                className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 inline-flex items-center justify-center border-[2.5px] border-border bg-brick text-on-destructive font-mono text-[10px] font-medium leading-none"
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>

          <a
            href="#subscribe"
            className="hidden sm:inline-flex items-center cursor-pointer border-[3px] border-border bg-foreground text-on-primary px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
          >
            Subscribe
          </a>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden cursor-pointer border-[3px] border-border bg-background p-2 shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" strokeWidth={2.5} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t-[3px] border-border bg-background"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col font-mono text-[12px] font-medium uppercase tracking-[0.18em]">
            <a
              href="#gallery"
              onClick={closeMobileMenu}
              className="px-2 py-3 border-b-[2px] border-border/40 hover:bg-mustard transition-colors cursor-pointer"
            >
              Gallery
            </a>
            <a
              href="#collections"
              onClick={closeMobileMenu}
              className="px-2 py-3 border-b-[2px] border-border/40 hover:bg-mustard transition-colors cursor-pointer"
            >
              Collections
            </a>
            <a
              href="#archive"
              onClick={closeMobileMenu}
              className="px-2 py-3 border-b-[2px] border-border/40 hover:bg-mustard transition-colors cursor-pointer"
            >
              Archive
            </a>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="px-2 py-3 border-b-[2px] border-border/40 hover:bg-mustard transition-colors cursor-pointer"
            >
              About
            </Link>
            <a
              href="#subscribe"
              onClick={closeMobileMenu}
              className="mt-3 mb-3 inline-flex items-center justify-center cursor-pointer border-[3px] border-border bg-foreground text-on-primary px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              Subscribe
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
