import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-border bg-foreground text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3 items-start">
        <div>
          <div className="[&_a]:!text-on-primary">
            {/* The Logo's children inherit color from this wrapper for the dark footer */}
            <FooterLogoDark />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-4 text-on-primary/70 max-w-xs">
            A small press of timeless photographs for your desktop and pocket.
            New issues monthly · free to download.
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-primary/60 mb-3">
            Sections
          </p>
          <ul className="space-y-2 font-mono text-xs uppercase tracking-[0.15em]">
            <li><a href="#gallery" className="cursor-pointer hover:text-mustard transition-colors">Gallery</a></li>
            <li><a href="#collections" className="cursor-pointer hover:text-mustard transition-colors">Collections</a></li>
            <li><a href="#archive" className="cursor-pointer hover:text-mustard transition-colors">The Archive</a></li>
            <li><Link to="/about" className="cursor-pointer hover:text-mustard transition-colors">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-primary/60 mb-3">
            Subscribe
          </p>
          <p className="font-sans text-sm text-on-primary/85 mb-3">
            Get one curated print in your inbox each week.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-stretch border-[3px] border-mustard bg-background text-foreground shadow-brutal-sm overflow-hidden max-w-sm"
          >
            <input
              type="email"
              required
              placeholder="YOUR@EMAIL"
              className="flex-1 bg-transparent px-3 py-2.5 font-mono text-xs uppercase tracking-[0.15em] placeholder:text-foreground/45 focus:outline-none"
            />
            <button
              type="submit"
              className="cursor-pointer border-l-[3px] border-mustard bg-mustard text-foreground px-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] hover:bg-foreground hover:text-mustard transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="border-t-[3px] border-mustard/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-primary/60">
            © Vintage Wallpapers Co. · Vol. I · Photos via Unsplash
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-primary/60">
            Built with{" "}
            <a
              href="https://beta.nativelyai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-mustard hover:text-on-primary transition-colors underline decoration-mustard/60 hover:decoration-on-primary underline-offset-4"
            >
              Native.builder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Inverted brand mark for the dark footer. */
function FooterLogoDark() {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="relative inline-flex items-center justify-center w-12 h-12 border-[3px] border-mustard bg-background">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7" fill="none">
          <path d="M3 4 L12 21 L21 4" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" />
          <path d="M7.5 4 L12 13.5 L16.5 4" stroke="#E8B83C" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
        <span aria-hidden className="absolute -top-1 -right-1 w-3 h-3 bg-brick border-[1.5px] border-mustard" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl tracking-tight uppercase text-on-primary">Vintage</span>
        <span className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-on-primary/80 mt-1">Wallpapers Co.</span>
      </span>
    </div>
  );
}

// Suppress unused warning from the Logo import being intentionally swapped for the dark variant.
void Logo;
