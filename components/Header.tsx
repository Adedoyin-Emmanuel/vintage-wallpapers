import { Heart, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useFavorites } from "../lib/favorites";

type Props = {
  onOpenFavorites: () => void;
  onOpenSearch: () => void;
};

export function Header({ onOpenFavorites, onOpenSearch }: Props) {
  const { count } = useFavorites();

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
            aria-label="Open menu"
            className="md:hidden cursor-pointer border-[3px] border-border bg-background p-2 shadow-brutal-sm press-sm"
          >
            <Menu className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
