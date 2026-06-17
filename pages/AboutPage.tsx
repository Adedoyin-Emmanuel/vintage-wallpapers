import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  ExternalLink,
  Hammer,
  Heart,
  Newspaper,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FavoritesPanel } from "../components/FavoritesPanel";

export default function AboutPage() {
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header onOpenFavorites={() => setFavoritesOpen(true)} />

      {/* Top strip — vol marker + back link */}
      <section className="border-b-[3px] border-border bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="cursor-pointer inline-flex items-center gap-2 border-[3px] border-border bg-background px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            Back to Gallery
          </Link>
          <span className="inline-flex items-center gap-2 border-[3px] border-border bg-mustard text-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] shadow-brutal-sm">
            <Newspaper className="w-3.5 h-3.5" strokeWidth={2.5} />
            Colophon · Vol. I
          </span>
        </div>
      </section>

      {/* Headline / lede */}
      <section className="relative overflow-hidden border-b-[3px] border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/70 mb-5">
              About this small press
            </p>
            <h1 className="font-heading uppercase leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              <span className="inline-block bg-foreground text-on-primary px-3 py-1 -rotate-1">
                Old paper.
              </span>{" "}
              <span className="inline-block bg-mustard text-foreground px-3 py-1 rotate-1 mt-2">
                New screens.
              </span>
              <span className="block mt-3">Made by hand,</span>
              <span className="inline-block bg-teal text-on-secondary px-3 py-1 -rotate-1 mt-2">
                built with AI.
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-foreground/85 mt-7 max-w-2xl">
              Vintage Wallpapers is a small, free press of timeless photography
              for your desktop and pocket. Every print is hand-picked,
              hand-rotated, and free to download — no accounts, no paywalls,
              no popups.
            </p>
          </div>

          {/* Decorative stamped card */}
          <aside className="lg:col-span-5">
            <div className="relative border-[3px] border-border bg-background shadow-brutal-lg p-6 sm:p-7">
              <span className="absolute -top-3 -left-3 inline-flex items-center gap-1.5 border-[3px] border-border bg-brick text-on-destructive px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] shadow-brutal-sm -rotate-2">
                <Sparkles className="w-3 h-3" strokeWidth={2.75} />
                Hand-set
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60 mb-2">
                Issue No. 001
              </p>
              <p className="font-heading text-2xl uppercase leading-tight">
                A free archive of vintage-feeling wallpapers — curated, printed
                on pixels, kept forever.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <Stat label="Prints" value="288" />
                <Stat label="Decades" value="VI" />
                <Stat label="Cost" value="$0" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Why it was built */}
      <section className="border-b-[3px] border-border bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60 mb-3">
              § 01
            </p>
            <h2 className="font-heading uppercase text-3xl sm:text-4xl leading-[0.95] tracking-tight">
              Why this exists
            </h2>
            <div className="mt-5 h-1 w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-8 space-y-5 font-sans text-base leading-relaxed text-foreground/85">
            <p>
              Most wallpaper sites are noisy. Pop-ups, sign-up walls, infinite
              category trees, AI-generated slop. I wanted somewhere quiet — a
              little corner of the web that feels like flipping through a
              second-hand magazine on a rainy Saturday.
            </p>
            <p>
              The brief was simple: cream paper, ink-black borders, a few
              saturated stamps of mustard and brick, and{" "}
              <span className="bg-mustard px-1.5 -rotate-1 inline-block">
                photographs that look like they remember something.
              </span>{" "}
              No accounts. No tracking. No "premium tier." Just open the page,
              find a print you like, hit download.
            </p>
            <p>
              It's also a love letter to neobrutalism done warmly — square
              corners, hard offset shadows, slightly off-grid rotation, but
              with a paper-and-ink palette instead of the usual screaming
              neon. Vintage on the outside, modern under the hood.
            </p>
          </div>
        </div>
      </section>

      {/* How it was built */}
      <section className="border-b-[3px] border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60 mb-3">
              § 02
            </p>
            <h2 className="font-heading uppercase text-3xl sm:text-4xl leading-[0.95] tracking-tight">
              How it was built
            </h2>
            <div className="mt-5 h-1 w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="font-sans text-base leading-relaxed text-foreground/85">
              The whole site was designed and shipped using{" "}
              <a
                href="https://beta.nativelyai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium underline decoration-mustard decoration-[2.5px] underline-offset-4 hover:bg-mustard hover:text-foreground transition-colors"
              >
                Native.builder
              </a>{" "}
              — an AI app builder for shipping real, production-grade web apps
              from a conversation. The design system, the components, the
              favorites store, the infinite-scroll archive — all built
              iteratively, one chat turn at a time.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <ToolCard
                icon={<Hammer className="w-4 h-4" strokeWidth={2.5} />}
                label="Builder"
                value="Native.builder"
              />
              <ToolCard
                icon={<Wrench className="w-4 h-4" strokeWidth={2.5} />}
                label="Stack"
                value="React · Vite · TS"
              />
              <ToolCard
                icon={<Sparkles className="w-4 h-4" strokeWidth={2.5} />}
                label="Style"
                value="Tailwind v4"
              />
            </div>

            <a
              href="https://beta.nativelyai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 cursor-pointer border-[3px] border-border bg-foreground text-on-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] shadow-brutal press focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              Build something with Native.builder
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      {/* Maker card */}
      <section className="border-b-[3px] border-border bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60 mb-3">
                § 03
              </p>
              <h2 className="font-heading uppercase text-3xl sm:text-4xl leading-[0.95] tracking-tight">
                The maker
              </h2>
              <div className="mt-5 h-1 w-16 bg-foreground" />
            </div>

            <div className="lg:col-span-8">
              <div className="relative border-[3px] border-border bg-background shadow-brutal-lg p-7 sm:p-9">
                {/* Stamps */}
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 border-[3px] border-border bg-mustard text-foreground px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] shadow-brutal-sm -rotate-2">
                  Designed &amp; built by
                </span>
                <span className="absolute -top-3 right-6 inline-flex items-center gap-1.5 border-[3px] border-border bg-brick text-on-destructive px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] shadow-brutal-sm rotate-2">
                  <Heart className="w-3 h-3 fill-on-destructive" strokeWidth={2.5} />
                  No. 001
                </span>

                <div className="flex items-start gap-5 sm:gap-7 flex-wrap sm:flex-nowrap mt-4">
                  {/* Monogram block */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 border-[3px] border-border bg-mustard flex items-center justify-center shadow-brutal">
                      <span className="font-heading text-4xl sm:text-5xl uppercase leading-none">
                        AE
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="absolute -bottom-2 -right-2 w-5 h-5 bg-brick border-[3px] border-border"
                    />
                  </div>

                  <div className="flex-1 min-w-[220px]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Curator · Engineer · One-person press
                    </p>
                    <h3 className="font-heading uppercase text-2xl sm:text-3xl leading-tight mt-1.5">
                      Adedoyin Emmanuel Adeniyi
                    </h3>
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-foreground/85 mt-3">
                      Hi — I'm a software engineer who likes shipping small,
                      well-made things on the internet. I picked the photos,
                      tuned the palette, and prompted every screen of this
                      site into existence. If something here made you smile,
                      that's the whole reason it exists.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href="https://adedoyin.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 cursor-pointer border-[3px] border-border bg-foreground text-on-primary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                      >
                        Visit my portfolio
                        <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </a>
                      <a
                        href="https://beta.nativelyai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 cursor-pointer border-[3px] border-border bg-background text-foreground px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] shadow-brutal-sm press-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                      >
                        Built on Native.builder
                        <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </a>
                    </div>

                    <dl className="mt-6 grid sm:grid-cols-2 gap-3">
                      <KV k="Portfolio" v="adedoyin.dev" href="https://adedoyin.dev" />
                      <KV
                        k="Builder"
                        v="beta.nativelyai.com"
                        href="https://beta.nativelyai.com"
                      />
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-b-[3px] border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
            Thanks for reading
          </p>
          <h2 className="font-heading uppercase text-4xl sm:text-5xl leading-[0.95] tracking-tight mt-4">
            Now go pick a print.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 cursor-pointer border-[3px] border-border bg-foreground text-on-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] shadow-brutal press focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
              Back to Gallery
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <FavoritesPanel
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#F4E9D2",
            color: "#1A1A1A",
            border: "3px solid #1A1A1A",
            borderRadius: "0px",
            boxShadow: "3px 3px 0 0 #1A1A1A",
            fontFamily: "'DM Mono', ui-monospace, monospace",
            fontSize: "12px",
            letterSpacing: "0.04em",
            padding: "10px 14px",
            textTransform: "uppercase",
          },
        }}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-[3px] border-border bg-background px-2 py-3 text-center shadow-brutal-sm">
      <div className="font-heading text-2xl leading-none">{value}</div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/65 mt-1.5">
        {label}
      </div>
    </div>
  );
}

function ToolCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border-[3px] border-border bg-paper-dark p-4 shadow-brutal-sm">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/65">
        <span className="inline-flex w-6 h-6 items-center justify-center border-[2.5px] border-border bg-background">
          {icon}
        </span>
        {label}
      </div>
      <div className="font-heading text-lg uppercase mt-2 leading-tight">
        {value}
      </div>
    </div>
  );
}

function KV({ k, v, href }: { k: string; v: string; href: string }) {
  return (
    <div className="border-[3px] border-border bg-paper-dark px-3 py-2.5 flex items-center justify-between gap-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/65">
        {k}
      </dt>
      <dd>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer font-mono text-xs uppercase tracking-[0.12em] underline decoration-mustard decoration-[2.5px] underline-offset-4 hover:bg-mustard hover:text-foreground transition-colors px-1"
        >
          {v}
        </a>
      </dd>
    </div>
  );
}
