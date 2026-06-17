import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ogImage from "./assets/og-image.png";

/**
 * Inject Open Graph + Twitter Card meta tags at runtime.
 *
 * 
 * The OG image is imported through Vite so it gets hashed and emitted into
 * the build output — we resolve it against `window.location.origin` so the
 * URL is absolute (required by most social crawlers).
 */
function injectSocialMeta() {
  const title = "Vintage Wallpapers — A curated archive of timeless backdrops";
  const description =
    "A hand-picked archive of timeless backdrops. Faded film, dusty sunsets, analog grain — printed on pixels, made for your desktop.";
  const imageUrl = new URL(ogImage, window.location.origin).toString();
  const imageAlt =
    "Vintage Wallpapers Co. homepage — curated archive of timeless desktop backdrops";

  // Tags to set, keyed by their unique selector so we update existing tags
  // (e.g. the default description) instead of duplicating them.
  const tags: Array<{
    selector: string;
    attr: "property" | "name";
    key: string;
    content: string;
  }> = [
    { selector: 'meta[name="description"]', attr: "name", key: "description", content: description },
    { selector: 'meta[property="og:type"]', attr: "property", key: "og:type", content: "website" },
    { selector: 'meta[property="og:site_name"]', attr: "property", key: "og:site_name", content: "Vintage Wallpapers Co." },
    { selector: 'meta[property="og:title"]', attr: "property", key: "og:title", content: title },
    { selector: 'meta[property="og:description"]', attr: "property", key: "og:description", content: description },
    { selector: 'meta[property="og:image"]', attr: "property", key: "og:image", content: imageUrl },
    { selector: 'meta[property="og:image:width"]', attr: "property", key: "og:image:width", content: "1000" },
    { selector: 'meta[property="og:image:height"]', attr: "property", key: "og:image:height", content: "563" },
    { selector: 'meta[property="og:image:alt"]', attr: "property", key: "og:image:alt", content: imageAlt },
    { selector: 'meta[name="twitter:card"]', attr: "name", key: "twitter:card", content: "summary_large_image" },
    { selector: 'meta[name="twitter:title"]', attr: "name", key: "twitter:title", content: title },
    { selector: 'meta[name="twitter:description"]', attr: "name", key: "twitter:description", content: description },
    { selector: 'meta[name="twitter:image"]', attr: "name", key: "twitter:image", content: imageUrl },
    { selector: 'meta[name="twitter:image:alt"]', attr: "name", key: "twitter:image:alt", content: imageAlt },
  ];

  for (const tag of tags) {
    let el = document.head.querySelector<HTMLMetaElement>(tag.selector);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(tag.attr, tag.key);
      document.head.appendChild(el);
    }
    el.content = tag.content;
  }

  // Also update the document title so it matches the OG title.
  document.title = title;
}
injectSocialMeta();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
