import { MorphBlob } from "./anime/morph-blob";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { skillGroups } from "../data/portfolio";

export function Skills() {
  return (
    <Section
      id="keahlian"
      index="03"
      eyebrow="Keahlian"
      title="Yang saya pakai sehari-hari"
      intro={
        <p>
          Bukan daftar kata kunci: ini alat yang benar-benar saya pakai untuk mengirim project
          sampai jalan di server.
        </p>
      }
    >
      <Reveal className="mb-12 flex flex-col items-center gap-8 border border-border p-6 sm:flex-row sm:gap-12 sm:p-10">
        <div className="morph-host shrink-0 sm:w-56">
          <MorphBlob tone="hot" />
        </div>
        <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
          Bentuk yang melintas di kiri itu satu SVG <span className="text-foreground">path</span> yang
          ditween dengan <span className="text-foreground">morphTo()</span> anime.js di dalam
          timeline berulang — bukan tiga gambar bergantian.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {skillGroups.map((group, order) => (
          <Reveal key={group.group} delay={order * 90}>
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
