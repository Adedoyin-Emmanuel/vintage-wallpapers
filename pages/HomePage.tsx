import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Gallery } from "../components/Gallery";
import { Footer } from "../components/Footer";
import { FavoritesPanel } from "../components/FavoritesPanel";
import { SearchSpotlight } from "../components/SearchSpotlight";

export default function HomePage() {
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // Nonce ensures the Gallery re-runs its scroll effect even when the same
  // wallpaper is picked twice in a row.
  const [highlightTarget, setHighlightTarget] = useState<
    { id: number; nonce: number } | null
  >(null);

  // ⌘/Ctrl+K from anywhere on the page opens the spotlight.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header
        onOpenFavorites={() => setFavoritesOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <Hero />
      <Gallery highlightTarget={highlightTarget} />
      <Footer />

      <FavoritesPanel
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />

      <SearchSpotlight
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPick={(w) => {
          setSearchOpen(false);
          setHighlightTarget({ id: w.id, nonce: Date.now() });
        }}
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
          success: {
            iconTheme: {
              primary: "#4A8B8B",
              secondary: "#F4E9D2",
            },
          },
          error: {
            iconTheme: {
              primary: "#B33A28",
              secondary: "#F4E9D2",
            },
          },
        }}
      />
    </div>
  );
}
