import { useEffect } from "react";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { CursorRing } from "./components/anime/cursor-ring";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Lab } from "./components/lab";
import { Projects } from "./components/projects";
import { SiteNav } from "./components/site-nav";
import { Skills } from "./components/skills";
import { Timeline } from "./components/timeline";
import { useLocale } from "./i18n/locale";
import { countUpAll, prefersReducedMotion, revealAll } from "./lib/motion";

export default function App() {
  const { ui } = useLocale();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (!reduced) document.documentElement.classList.add("motion-ready");
    const stopReveal = reduced ? () => {} : revealAll(document.body);
    const stopCounts = countUpAll(document.body);
    return () => {
      document.documentElement.classList.remove("motion-ready");
      stopReveal();
      stopCounts();
    };
  }, []);

  return (
    <div className="relative">
      <div className="grain" aria-hidden="true" />
      <CursorRing />
      <a
        href="#project"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {ui.skipLink}
      </a>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Lab />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
