import { EmptyField } from "./empty-field";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { useLocale } from "../i18n/locale";

export function Timeline() {
  const { locale, ui, content } = useLocale();
  const entries = content.timeline;
  return (
    <Section
      id="perjalanan"
      index="05"
      eyebrow={ui.nav.journey}
      title={ui.timeline.title}
      intro={
        entries.length ? (
          <p>{ui.timeline.intro}</p>
        ) : (
          <EmptyField path="timeline" />
        )
      }
    >
      {entries.length ? (
        <ol className="relative border-l border-border pl-8 sm:pl-12">
          {entries.map((entry, order) => (
            <li key={order} className="relative pb-12 last:pb-0">
              <Reveal delay={order * 80}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(2rem+5px)] top-2 size-2.5 rounded-full bg-primary sm:-left-[calc(3rem+5px)]"
                />
                <p className="label text-muted-foreground">{entry.period}</p>
                <h3 className="display mt-3 text-[clamp(1.3rem,3.4vw,2rem)]">{entry.title}</h3>
                <p className="mt-1 text-base text-primary">{entry.place}</p>
                <p className="mt-3 max-w-2xl text-muted-foreground">{entry.note}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      ) : (
        <Reveal>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {locale === "en" ? (
              <>
                Example: <span className="text-foreground">2024 — now</span>, studying engineering;{" "}
                <span className="text-foreground">2025</span>, working as the developer of an
                organisation portal. Add each entry to the{" "}
                <code className="font-mono text-foreground">timeline</code> array.
              </>
            ) : (
              <>
                Contoh: <span className="text-foreground">2024 — sekarang</span>, kuliah Teknik;{" "}
                <span className="text-foreground">2025</span>, jadi pengembang portal organisasi.
                Tambahkan tiap entri di array <code className="font-mono text-foreground">timeline</code>
                .
              </>
            )}
          </p>
        </Reveal>
      )}
    </Section>
  );
}
