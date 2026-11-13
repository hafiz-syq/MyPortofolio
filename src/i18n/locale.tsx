import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buildContent, type SiteContent } from "./content-en";
import { defaultLocale, ogLocale, readStoredLocale, storeLocale, type Locale } from "./locales";
import { ui, type UiCopy } from "./ui";

type LocaleValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  ui: UiCopy;
  content: SiteContent;
};

const LocaleContext = createContext<LocaleValue | null>(null);

function setMetaContent(selector: string, content: string) {
  const node = document.querySelector(selector);
  if (node) node.setAttribute("content", content);
}

/**
 * Render pertama selalu defaultLocale supaya identik dengan markup hasil prerender;
 * pilihan tersimpan baru dipakai satu effect setelah hydration, jadi tidak ada
 * mismatch dan tidak ada teks Indonesia yang sempat ter-render sebagai Inggris.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== defaultLocale) setLocale(stored);
  }, []);

  useEffect(() => {
    const copy = ui[locale];
    document.documentElement.lang = locale;
    document.title = copy.meta.title;
    setMetaContent('meta[name="description"]', copy.meta.description);
    setMetaContent('meta[property="og:title"]', copy.meta.title);
    setMetaContent('meta[property="og:description"]', copy.meta.description);
    setMetaContent('meta[property="og:locale"]', ogLocale[locale]);
  }, [locale]);

  const pick = useCallback((next: Locale) => {
    setLocale(next);
    storeLocale(next);
  }, []);

  const value = useMemo<LocaleValue>(
    () => ({ locale, setLocale: pick, ui: ui[locale], content: buildContent(locale) }),
    [locale, pick],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  return useContext(LocaleContext)!;
}
