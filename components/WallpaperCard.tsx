import { useState } from "react";
import { Download, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { previewUrl, type Wallpaper } from "../data/wallpapers";
import { downloadWallpaper } from "../lib/download";
import { useFavorites } from "../lib/favorites";

const ratioClass: Record<Wallpaper["ratio"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3] sm:col-span-2",
};

/** Deterministic "random" rotation per card so the gallery looks like a collage. */
function rotationFor(id: number): string {
  const opts = ["-rotate-2", "-rotate-1", "rotate-0", "rotate-1", "rotate-2"];
  return opts[id % opts.length];
}

export function WallpaperCard({ wallpaper }: { wallpaper: Wallpaper }) {
  const { has, toggle } = useFavorites();
  const liked = has(wallpaper.id);
  const [downloading, setDownloading] = useState(false);

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const nowFavorite = toggle(wallpaper.id);
    if (nowFavorite) {
      toast.success(`Added ${wallpaper.label} to favorites`);
    } else {
      toast(`Removed ${wallpaper.label} from favorites`);
    }
  }

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadWallpaper(wallpaper);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <figure
      className={`group relative ${ratioClass[wallpaper.ratio]} ${rotationFor(
        wallpaper.id
      )} press cursor-pointer border-[3px] border-border bg-background shadow-brutal overflow-hidden hover:z-10 hover:rotate-0`}
    >
      <img
        src={previewUrl(wallpaper.unsplashId, 900)}
        alt={`${wallpaper.category} wallpaper ${wallpaper.label} — photo by ${wallpaper.author}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top tag — hard black box, mustard fill */}
      <span className="absolute top-3 left-3 z-10 inline-flex items-center border-[2.5px] border-border bg-mustard text-foreground px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.18em]">
        {wallpaper.tag}
      </span>

      {/* Favorited indicator (corner badge) */}
      {liked && (
        <span
          aria-hidden
          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-7 h-7 border-[2.5px] border-border bg-brick"
        >
          <Heart className="w-3.5 h-3.5 fill-on-destructive text-on-destructive" strokeWidth={2.5} />
        </span>
      )}

      {/* Caption strip — solid cream with hard black top border */}
      <figcaption className="absolute bottom-0 left-0 right-0 border-t-[3px] border-border bg-background px-3 py-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="font-heading uppercase text-sm sm:text-base leading-none tracking-tight truncate">
            {wallpaper.label} · {wallpaper.category}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/65 mt-1 truncate">
            {wallpaper.year} · {wallpaper.author}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={liked}
            onClick={handleToggleFavorite}
            className={`cursor-pointer border-[2.5px] border-border p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard ${
              liked
                ? "bg-brick text-on-destructive hover:bg-foreground"
                : "bg-background hover:bg-paper-dark"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                liked ? "fill-on-destructive" : ""
              }`}
              strokeWidth={2.5}
            />
          </button>
          <button
            type="button"
            aria-label={`Download ${wallpaper.label}`}
            onClick={handleDownload}
            disabled={downloading}
            className="cursor-pointer border-[2.5px] border-border bg-foreground text-on-primary p-1.5 transition-colors hover:bg-mustard hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard disabled:opacity-60 disabled:cursor-wait"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
