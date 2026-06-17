import { ArrowDown, Star } from "lucide-react";
import { previewUrl, WALLPAPERS } from "../data/wallpapers";

// Three wallpapers used as the hero collage.
const HERO_FRAMES = [WALLPAPERS[1], WALLPAPERS[3], WALLPAPERS[0]];

export function Hero() {
  return (
    <section className="border-b-[3px] border-border bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          {/* Volume badge */}
          <span className="inline-flex items-center gap-2 border-[3px] border-border bg-mustard text-foreground px-3 py-1.5 font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] shadow-brutal-sm">
            <Star className="w-3 h-3 fill-foreground" strokeWidth={2.5} />
            Vol. 01 · Curated Edition
          </span>

          {/* Headline with color block backgrounds */}
          <h1 className="mt-6 font-heading uppercase leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <span className="block">Wallpapers</span>
            <span className="block mt-2">
              <span className="inline-block bg-brick text-on-destructive border-[3px] border-border px-3 py-1 shadow-brutal-sm -rotate-1">From</span>{" "}
              <span className="inline-block bg-teal text-on-secondary border-[3px] border-border px-3 py-1 shadow-brutal-sm rotate-1">Another</span>
            </span>
            <span className="block mt-2">
              <span className="inline-block bg-mustard text-foreground border-[3px] border-border px-3 py-1 shadow-brutal-sm -rotate-1">Era.</span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-foreground/85 font-sans">
            A hand-picked archive of timeless backdrops. Faded film, dusty
            sunsets, analog grain — printed on pixels, made for your desktop.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#gallery"
              className="cursor-pointer inline-flex items-center gap-2 border-[3px] border-border bg-foreground text-on-primary px-5 py-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.18em] shadow-brutal press focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              Browse Gallery
              <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
            </a>
            <a
              href="#archive"
              className="cursor-pointer inline-flex items-center gap-2 border-[3px] border-border bg-background text-foreground px-5 py-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.18em] shadow-brutal press focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              The Archive
            </a>
          </div>

          {/* Stat boxes */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
            <Stat label="Editions" value={`${WALLPAPERS.length}+`} />
            <Stat label="Decades" value="5" />
            <Stat label="Resolution" value="4K" />
          </div>
        </div>

        {/* Right: stacked photo collage */}
        <div className="lg:col-span-5 relative h-[480px] sm:h-[580px] lg:h-[620px]">
          <HeroFrame
            className="absolute left-0 top-6 w-52 sm:w-64 lg:w-72 aspect-[3/4] -rotate-6"
            wallpaper={HERO_FRAMES[0]}
            stripe="teal"
          />
          <HeroFrame
            className="absolute right-0 top-0 w-52 sm:w-64 lg:w-72 aspect-[3/4] rotate-3"
            wallpaper={HERO_FRAMES[1]}
            stripe="mustard"
          />
          <HeroFrame
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-60 sm:w-72 lg:w-80 aspect-square -rotate-2 z-10"
            wallpaper={HERO_FRAMES[2]}
            stripe="brick"
            featured
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-[3px] border-border bg-background px-3 py-2.5 shadow-brutal-sm">
      <div className="font-mono text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/70">
        {label}
      </div>
      <div className="font-heading text-xl sm:text-2xl mt-1 leading-none">
        {value}
      </div>
    </div>
  );
}

function HeroFrame({
  className,
  wallpaper,
  stripe,
  featured,
}: {
  className: string;
  wallpaper: (typeof WALLPAPERS)[number];
  stripe: "teal" | "mustard" | "brick";
  featured?: boolean;
}) {
  const stripeClass =
    stripe === "teal"
      ? "bg-stripes-teal"
      : stripe === "mustard"
      ? "bg-stripes-mustard"
      : "bg-stripes-brick";

  return (
    <div
      className={`${className} border-[3px] border-border ${stripeClass} ${
        featured ? "shadow-brutal-xl" : "shadow-brutal-lg"
      } overflow-hidden`}
    >
      <img
        src={previewUrl(wallpaper.unsplashId, 600)}
        alt={`${wallpaper.category} wallpaper ${wallpaper.label} — photo by ${wallpaper.author}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
      />
      {/* Bottom ID strip */}
      <span className="absolute bottom-0 left-0 right-0 border-t-[3px] border-border bg-background/95 backdrop-blur-sm px-2 py-1 font-mono text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">
        {featured ? `★ ${wallpaper.tag}` : wallpaper.tag}
      </span>
    </div>
  );
}
