import { useEffect, useState, useCallback } from "react";

/**
 * Tiny localStorage-backed favorites store with a pub/sub API so every
 * mounted component (cards, header badge, side panel) stays in sync without
 * needing a global state library.
 */

const STORAGE_KEY = "vw:favorites:v1";
const EVENT_NAME = "vw:favorites:change";

function readFromStorage(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "number") : [];
  } catch {
    return [];
  }
}

function writeToStorage(ids: number[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* quota / private mode — ignore */
  }
  // Notify same-tab subscribers (storage events only fire across tabs).
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function getFavorites(): number[] {
  return readFromStorage();
}

export function isFavorite(id: number): boolean {
  return readFromStorage().includes(id);
}

export function toggleFavorite(id: number): boolean {
  const current = readFromStorage();
  const has = current.includes(id);
  const next = has ? current.filter((x) => x !== id) : [id, ...current];
  writeToStorage(next);
  return !has; // returns the new state (true = now favorited)
}

export function removeFavorite(id: number) {
  const current = readFromStorage();
  writeToStorage(current.filter((x) => x !== id));
}

export function clearFavorites() {
  writeToStorage([]);
}

/**
 * React hook returning the current favorites array and helpers. Re-renders
 * automatically whenever favorites change anywhere in the app.
 */
export function useFavorites() {
  const [ids, setIds] = useState<number[]>(() => readFromStorage());

  useEffect(() => {
    const onChange = () => setIds(readFromStorage());
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onChange); // cross-tab sync
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const toggle = useCallback((id: number) => toggleFavorite(id), []);
  const remove = useCallback((id: number) => removeFavorite(id), []);
  const clear = useCallback(() => clearFavorites(), []);
  const has = useCallback((id: number) => ids.includes(id), [ids]);

  return { ids, toggle, remove, clear, has, count: ids.length };
}
