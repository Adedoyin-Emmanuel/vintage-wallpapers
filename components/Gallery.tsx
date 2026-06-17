import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, WALLPAPERS } from "../data/wallpapers";
import { GalleryControls } from "./GalleryControls";
import { WallpaperCard } from "./WallpaperCard";

/** Number of wallpapers revealed per "page" as the user scrolls. */
const PAGE_SIZE = 24;

type Props = {
  /**
   * When set, the Gallery ensures the wallpaper with this id is rendered
   * (clearing filters + expanding pagination as needed), then scrolls to it
   * and briefly highlights the card. Increment the `nonce` to re-trigger
   * even if the id hasn't changed.
   */
  highlightTarget?: { id: number; nonce: number } | null;
};

export function Gallery({ highlightTarget }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WALLPAPERS.filter((w) => {
      const matchesCat = activeCategory === "All" || w.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        w.label.toLowerCase().includes(q) ||
        w.author.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.year.includes(q) ||
        w.tag.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCategory]);

  // Reset pagination whenever the filter/search changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Infinite scroll sentinel — reveals another page when it enters view.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
          }
        }
      },
      { rootMargin: "800px 0px" } // start loading well before sentinel hits viewport
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, filtered.length]);

  // External highlight signal — clear filters, reveal enough pages, then scroll.
  useEffect(() => {
    if (!highlightTarget) return;
    const { id } = highlightTarget;

    // Clear any active filtering so the target is reachable.
    setQuery("");
    setActiveCategory("All");

    // Make sure enough cards are rendered to include the target id.
    setVisibleCount((c) => {
      if (id <= c) return c;
      // Round up to the next page boundary.
      const needed = Math.ceil(id / PAGE_SIZE) * PAGE_SIZE;
      return Math.min(needed, WALLPAPERS.length);
    });

    // After the DOM updates, scroll the card into view and pulse it.
    const t = window.setTimeout(() => {
      const el = document.getElementById(`wallpaper-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedId(id);
        window.setTimeout(() => setHighlightedId(null), 1800);
      }
    }, 80);
    return () => window.clearTimeout(t);
  }, [highlightTarget]);

  return (
    <>
      <GalleryControls
        count={filtered.length}
        total={WALLPAPERS.length}
        query={query}
        onQueryChange={setQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section className="bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          {filtered.length === 0 ? (
            <div className="border-[3px] border-dashed border-border bg-background py-20 text-center shadow-brutal-sm">
              <p className="font-heading text-2xl sm:text-3xl uppercase tracking-tight">
                Nothing in the archive matches.
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/65 mt-3">
                Try a different word or category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {visible.map((w) => (
                  <div
                    key={w.id}
                    id={`wallpaper-${w.id}`}
                    className={
                      highlightedId === w.id
                        ? "transition-shadow duration-300 ring-4 ring-mustard ring-offset-2 ring-offset-paper rounded-sm"
                        : "transition-shadow duration-300"
                    }
                  >
                    <WallpaperCard wallpaper={w} />
                  </div>
                ))}
              </div>

              {/* Infinite scroll sentinel + loading row */}
              {hasMore ? (
                <div
                  ref={sentinelRef}
                  className="mt-12 flex flex-col items-center justify-center gap-3"
                  aria-live="polite"
                >
                  <div className="inline-flex items-center gap-3 border-[3px] border-border bg-background px-4 py-2.5 shadow-brutal-sm">
                    <span className="w-3 h-3 bg-mustard border-[2px] border-border animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Loading more prints…
                    </span>
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/55">
                    {visible.length} / {filtered.length} shown
                  </p>
                </div>
              ) : (
                <div className="mt-12 flex flex-col items-center justify-center gap-2">
                  <div className="inline-flex items-center gap-2 border-[3px] border-border bg-foreground text-on-primary px-4 py-2 shadow-brutal-sm">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      — End of the archive —
                    </span>
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/55">
                    {filtered.length} {filtered.length === 1 ? "print" : "prints"} total
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
