import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "../i18n/locale";
import { LanguageSwitch } from "./language-switch";

function monogram(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return initials || "◆";
}

export function SiteNav() {
  const { ui, content } = useLocale();
  const links = [
    { href: "#tentang", label: ui.nav.about },
    { href: "#project", label: ui.nav.projects },
    { href: "#keahlian", label: ui.nav.skills },
    { href: "#lab", label: ui.nav.lab },
    { href: "#perjalanan", label: ui.nav.journey },
  ];
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      setProgress(scrollable > 0 ? root.scrollTop / scrollable : 0);
      setSolid(root.scrollTop > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        solid ? "bg-background/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#atas" className="label text-muted-foreground hover:text-primary">
          {monogram(content.profile.name)} <span className="sr-only">{ui.nav.toTop}</span>
        </a>

        <nav aria-label={ui.nav.mainLabel} className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              style={{ borderRadius: "calc(var(--site-radius) - 8px)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          <Button asChild size="sm" className="rounded-full px-5">
            <a href="#kontak">{ui.nav.contact}</a>
          </Button>
        </div>
      </div>

      <nav
        aria-label={ui.nav.compactLabel}
        className="scrollbar-none flex gap-2 overflow-x-auto px-5 pb-3 md:hidden"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="label shrink-0 border border-border px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="h-px w-full bg-border">
        <div
          className="h-px origin-left bg-primary"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
