export type Locale = "id" | "en";

export const localeCodes: Locale[] = ["id", "en"];

/**
 * Bahasa bawaan sama dengan bahasa hasil prerender di dist/index.html, jadi
 * HTML pertama dan render pertama client selalu identik (tanpa hydration mismatch).
 */
export const defaultLocale: Locale = "id";

/** Nilai <meta property="og:locale"> per bahasa (kode bahasa + wilayah). */
export const ogLocale: Record<Locale, string> = { id: "id_ID", en: "en_US" };

const storageKey = "portfolio-locale";

export function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    return window.localStorage.getItem(storageKey) === "en" ? "en" : "id";
  } catch {
    // Mode privat Safari bisa melempar saat membaca; cukup pakai bawaan.
    return defaultLocale;
  }
}

export function storeLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, locale);
  } catch {
    // Preferensi yang tidak tersimpan bukan alasan untuk membatalkan pergantian bahasa.
  }
}
