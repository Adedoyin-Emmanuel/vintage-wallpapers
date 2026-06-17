import { Search } from "lucide-react";
import { CATEGORIES } from "../data/wallpapers";

type Props = {
  count: number;
  total: number;
  query: string;
  onQueryChange: (q: string) => void;
  activeCategory: (typeof CATEGORIES)[number];
  onCategoryChange: (c: (typeof CATEGORIES)[number]) => void;
};

export function GalleryControls({
  count,
  total,
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
}: Props) {
  return (
    <section id="gallery" className="border-b-[3px] border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col md:flex-row md:items-end gap-5 md:justify-between">
        <div className="flex items-end gap-4 flex-wrap">
          <h2 className="font-heading text-4xl sm:text-5xl uppercase leading-none tracking-tight">
            The Gallery
          </h2>
          <span className="font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] border-[3px] border-border bg-mustard text-foreground px-2.5 py-1 shadow-brutal-sm">
            {count} / {total} Prints
          </span>
        </div>

        <label className="flex items-stretch border-[3px] border-border bg-background w-full md:w-96 shadow-brutal-sm focus-within:translate-x-[-1px] focus-within:translate-y-[-1px] focus-within:shadow-brutal transition-transform overflow-hidden">
          <span className="px-3 flex items-center border-r-[3px] border-border bg-foreground text-on-primary">
            <Search className="w-4 h-4" strokeWidth={2.5} />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="SEARCH THE ARCHIVE…"
            className="flex-1 bg-transparent px-3 py-2.5 font-mono text-sm placeholder:text-foreground/50 placeholder:uppercase placeholder:tracking-[0.15em] placeholder:text-xs focus:outline-none"
          />
        </label>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-wrap gap-3">
        {CATEGORIES.map((c, i) => {
          const active = c === activeCategory;
          // Rotate active accent color through the palette for visual variety
          const accents = [
            "bg-foreground text-on-primary",
            "bg-mustard text-foreground",
            "bg-teal text-on-secondary",
            "bg-brick text-on-destructive",
            "bg-orange text-on-orange",
          ];
          const activeAccent = accents[i % accents.length];
          return (
            <button
              key={c}
              type="button"
              onClick={() => onCategoryChange(c)}
              className={`cursor-pointer border-[3px] border-border px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard ${
                active
                  ? `${activeAccent} shadow-brutal-sm`
                  : "bg-background text-foreground hover:bg-paper-dark shadow-brutal-sm"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </section>
  );
}
