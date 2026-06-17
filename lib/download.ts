import toast from "react-hot-toast";
import { downloadUrl, type Wallpaper } from "../data/wallpapers";

/**
 * Fetches the full-size image from Unsplash and triggers a browser download.
 * Shows a loading toast that resolves into success/error.
 */
export async function downloadWallpaper(w: Wallpaper) {
  const url = downloadUrl(w.unsplashId);
  const filename = `vintage-wallpapers-${w.tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${w.category.toLowerCase()}.jpg`;

  await toast.promise(
    (async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    })(),
    {
      loading: `Preparing ${w.label}…`,
      success: `Saved ${w.label} to your downloads`,
      error: "Download failed — try again",
    }
  );
}
