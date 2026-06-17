import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, Image as ImageIcon } from "lucide-react";
import { WALLPAPERS, previewUrl, type Wallpaper } from "../data/wallpapers";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Called when the user picks a wallpaper — host scrolls/highlights it. */
  onPick: (w: Wallpaper) => void;
};

/** Maximum results rendered at once — keeps the modal snappy. */
const MAX_RESULTS = 60;

/**
 * Spotlight-style search modal. Opens on the header search icon (or ⌘/Ctrl+K),
 * searches the entire wallpaper catalogue by number, category, year and author,
 * and lets the user browse results in a thumbnail grid. Picking a result closes
 * the modal and asks the host to scroll/highlight that wallpaper in the gallery.
 */
export function SearchSpotlight({ open, onClose, onPick }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Reset the query whenever the modal opens, and focus the input.
  useEffect(() => {
    if (open) {
      setQuery("");
      // Defer focus to after the modal mounts/animates in.
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes; ⌘/Ctrl+K toggles even when the modal is mounted.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      // Empty query → show a curated first page (first ~36) so users can browse.
      return WALLPAPERS.slice(0, 36);
    }

    // Strip leading "no. " / "#" so a user can type "42" or "no 42" or "#042"
    const normalized = q.replace(/^(no\.?\s*|#)/, "").trim();
    const numericMatch = /^0*\d+$/.test(normalized);

    return WALLPAPERS.filter((w) => {
      if (numericMatch && String(w.id) === String(parseInt(normalized, 10))) {
        return true;
      }
      return (
        w.label.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.author.toLowerCase().includes(q) ||
        w.year.includes(q) ||
        w.tag.toLowerCase().includes(q)
      );
    }).slice(0, MAX_RESULTS);
  }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the archive"
      className="fixed inset-0 z-50 flex items-start justify-center px-3 sm:px-6 pt-[8vh] sm:pt-[10vh] pb-6"
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/55 cursor-pointer animate-[fadeIn_120ms_ease-out]"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl border-[3px] border-border bg-background shadow-brutal flex flex-col max-h-[84vh] animate-[popIn_160ms_cubic-bezier(0.34,1.56,0.64,1)]">
        {/* Search bar */}
        <div className="flex items-stretch border-b-[3px] border-border">
          <span className="px-4 flex items-center bg-foreground text-on-primary border-r-[3px] border-border">
            <Search className="w-5 h-5" strokeWidth={2.5} />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BY NUMBER, CATEGORY, YEAR, OR PHOTOGRAPHER…"
            className="flex-1 bg-transparent px-4 py-4 font-mono text-sm sm:text-base placeholder:text-foreground/45 placeholder:uppercase placeholder:tracking-[0.15em] placeholder:text-[11px] focus:outline-none"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="cursor-pointer px-4 flex items-center border-l-[3px] border-border bg-background hover:bg-mustard transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mustard"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Meta strip */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b-[3px] border-border bg-paper">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/65">
            {query.trim().length === 0
              ? `${WALLPAPERS.length} prints in the archive`
              : `${results.length} ${results.length === 1 ? "match" : "matches"}${results.length >= MAX_RESULTS ? "+" : ""}`}
          </p>
          <p className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55">
            <kbd className="inline-flex items-center justify-center min-w-5 h-5 px-1 border-[2px] border-border bg-background text-[10px]">
              Esc
            </kbd>
            to close
          </p>
        </div>


        {/* Results */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {results.length === 0 ? (
            <div className="border-[3px] border-dashed border-border bg-paper py-14 text-center">
              <ImageIcon className="w-7 h-7 mx-auto mb-3 opacity-50" strokeWidth={2.5} />
              <p className="font-heading text-xl uppercase tracking-tight">
                Nothing in the archive matches.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 mt-2">
                Try a number, decade, or photographer's name.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {results.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => onPick(w)}
                  className="group cursor-pointer text-left border-[3px] border-border bg-background overflow-hidden press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-dark">
                    <img
                      src={previewUrl(w.unsplashId, 480)}
                      alt={`${w.category} wallpaper ${w.label}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 font-mono text-[9px] uppercase tracking-[0.18em] bg-mustard text-foreground border-[2px] border-border px-1.5 py-0.5">
                      {w.label}
                    </span>
                  </div>
                  <div className="border-t-[3px] border-border px-2 py-1.5">
                    <p className="font-heading uppercase text-xs leading-none tracking-tight truncate">
                      {w.category}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/65 mt-1 truncate">
                      {w.year} · {w.author}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inline keyframes — kept local so we don't pollute the global CSS. */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_120ms_ease-out\\],
          .animate-\\[popIn_160ms_cubic-bezier\\(0\\.34\\,1\\.56\\,0\\.64\\,1\\)\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
