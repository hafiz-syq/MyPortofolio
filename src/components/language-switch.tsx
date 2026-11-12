import { animate } from "animejs";
import { useLocale } from "../i18n/locale";
import { localeCodes, type Locale } from "../i18n/locales";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "@/lib/utils";

/** Pakainya kelas .filter-chip yang sudah ada di globals.css supaya kontrasnya ikut yang sudah diaudit. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, ui } = useLocale();

  const press = (next: Locale, node: HTMLElement) => {
    setLocale(next);
    if (!prefersReducedMotion()) {
      animate(node, { scale: [0.9, 1], duration: 520, ease: "outElastic(1, 0.4)" });
    }
  };

  return (
    <div role="group" aria-label={ui.language.groupLabel} className={cn("flex items-center gap-1.5", className)}>
      {localeCodes.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={code === locale}
          data-active={code === locale}
          className="filter-chip"
          onClick={(event) => press(code, event.currentTarget)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
