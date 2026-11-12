import { MorphBlob } from "./anime/morph-blob";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { useLocale } from "../i18n/locale";

export function Skills() {
  const { locale, ui, content } = useLocale();
  return (
    <Section
      id="keahlian"
      index="03"
      eyebrow={ui.nav.skills}
      title={ui.skills.title}
      intro={<p>{ui.skills.intro}</p>}
    >
      <Reveal className="mb-12 flex flex-col items-center gap-8 border border-border p-6 sm:flex-row sm:gap-12 sm:p-10">
        <div className="morph-host shrink-0 sm:w-56">
          <MorphBlob tone="hot" />
        </div>
        <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
          {locale === "en" ? (
            <>
              The shape drifting on the left is one SVG <span className="text-foreground">path</span>{" "}
              tweened with <span className="text-foreground">morphTo()</span> from anime.js inside a
              repeating timeline — not three images taking turns.
            </>
          ) : (
            <>
              Bentuk yang melintas di kiri itu satu SVG{" "}
              <span className="text-foreground">path</span> yang ditween dengan{" "}
              <span className="text-foreground">morphTo()</span> anime.js di dalam timeline berulang —
              bukan tiga gambar bergantian.
            </>
          )}
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {content.skillGroups.map((group, order) => (
          <Reveal key={order} delay={order * 90}>
            <div className="hover-lift h-full border border-border p-6" style={{ borderRadius: "var(--site-radius)" }}>
              <h3 className="label text-primary">{group.group}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-border bg-secondary/60 px-3 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-foreground"
                    style={{ borderRadius: "calc(var(--site-radius) - 8px)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
