import { Link } from "react-router-dom";

/**
 * Vintage Wallpapers brand mark.
 *
 * A chunky black square containing a stenciled "V" with two bold internal lines,
 * paired with stacked wordmark "VINTAGE / WALLPAPERS CO." in Archivo Black.
 * Inspired by the inspiration screenshot — neobrutalist, no rounded corners.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 cursor-pointer ${className}`}
      aria-label="Vintage Wallpapers Co. — home"
    >
      {/* Mark */}
      <span className="relative inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 border-[3px] border-border bg-foreground shadow-brutal-sm">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
        >
          {/* Stenciled "V" */}
          <path
            d="M3 4 L12 21 L21 4"
            stroke="#E8B83C"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* Inner ghost stroke for that printed look */}
          <path
            d="M7.5 4 L12 13.5 L16.5 4"
            stroke="#F4E9D2"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
        {/* Corner star stamp */}
        <span
          aria-hidden
          className="absolute -top-1 -right-1 w-3 h-3 bg-brick border-[1.5px] border-border"
        />
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg sm:text-xl tracking-tight uppercase text-foreground">
          Vintage
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/80 mt-1">
          Wallpapers Co.
        </span>
      </span>
    </Link>
  );
}
