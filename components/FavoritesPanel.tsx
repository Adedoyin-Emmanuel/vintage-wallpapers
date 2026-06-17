import { useEffect } from "react";
import { Download, Heart, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import {
  getWallpaperById,
  previewUrl,
  type Wallpaper,
} from "../data/wallpapers";
import { useFavorites } from "../lib/favorites";
import { downloadWallpaper } from "../lib/download";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function FavoritesPanel({ open, onClose }: Props) {
  const { ids, remove, clear } = useFavorites();

  // Resolve favorite ids to full wallpaper records (filter out any unknowns).
  const favorites: Wallpaper[] = ids
    .map((id) => getWallpaperById(id))
    .filter((w): w is Wallpaper => Boolean(w));

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent background scroll while panel is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function downloadAll() {
    if (favorites.length === 0) return;
    toast(`Starting ${favorites.length} downloads…`, { icon: "↓" });
    // Sequentially to avoid hammering the network
    for (const w of favorites) {
      try {
        await downloadWallpaper(w);
      } catch {
        /* downloadWallpaper handles its own toast on failure */
      }
    }
  }

  function handleRemove(w: Wallpaper) {
    remove(w.id);
    toast(`Removed ${w.label} from favorites`);
  }

  function handleClear() {
    if (favorites.length === 0) return;
    clear();
    toast("Cleared all favorites");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-foreground/40 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Favorites"
        aria-hidden={!open}
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md md:max-w-lg bg-background border-l-[3px] border-border shadow-brutal-xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b-[3px] border-border bg-mustard">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center justify-center w-9 h-9 border-[3px] border-border bg-background shrink-0">
              <Heart className="w-4 h-4 fill-brick text-brick" strokeWidth={2.5} />
            </span>
            <div className="min-w-0">
              <h2 className="font-heading uppercase text-xl sm:text-2xl leading-none tracking-tight truncate">
                Your Favorites
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-1 text-foreground/75">
                {favorites.length} {favorites.length === 1 ? "print" : "prints"} saved
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close favorites"
            className="cursor-pointer border-[3px] border-border bg-background p-2 shadow-brutal-sm press-sm shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Actions */}
        {favorites.length > 0 && (
          <div className="px-4 sm:px-6 py-3 border-b-[3px] border-border bg-background flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadAll}
              className="cursor-pointer inline-flex items-center gap-2 border-[3px] border-border bg-foreground text-on-primary px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
              Download All
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="cursor-pointer inline-flex items-center gap-2 border-[3px] border-border bg-background text-foreground px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] shadow-brutal-sm press-sm hover:bg-brick hover:text-on-destructive transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
              Clear All
            </button>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 bg-paper">
          {favorites.length === 0 ? (
            <div className="border-[3px] border-dashed border-border bg-background py-14 px-6 text-center mt-6">
              <Heart className="w-8 h-8 mx-auto text-foreground/50" strokeWidth={2} />
              <p className="font-heading uppercase text-xl sm:text-2xl tracking-tight mt-4">
                No favorites yet.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/65 mt-3 max-w-xs mx-auto">
                Tap the heart on any print to save it here for later.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {favorites.map((w) => (
                <li
                  key={w.id}
                  className="flex items-stretch gap-3 border-[3px] border-border bg-background shadow-brutal-sm overflow-hidden"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border-r-[3px] border-border overflow-hidden">
                    <img
                      src={previewUrl(w.unsplashId, 320)}
                      alt={`${w.category} wallpaper ${w.label}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-2 pr-2 flex flex-col justify-between">
                    <div className="min-w-0">
                      <p className="font-heading uppercase text-sm sm:text-base leading-none tracking-tight truncate">
                        {w.label} · {w.category}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/65 mt-1.5 truncate">
                        {w.year} · by {w.author}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <button
                        type="button"
                        onClick={() => downloadWallpaper(w)}
                        aria-label={`Download ${w.label}`}
                        className="cursor-pointer inline-flex items-center gap-1.5 border-[2.5px] border-border bg-foreground text-on-primary px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] hover:bg-mustard hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                      >
                        <Download className="w-3 h-3" strokeWidth={2.5} />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(w)}
                        aria-label={`Remove ${w.label}`}
                        className="cursor-pointer inline-flex items-center gap-1 border-[2.5px] border-border bg-background text-foreground px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] hover:bg-brick hover:text-on-destructive transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                      >
                        <Trash2 className="w-3 h-3" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
