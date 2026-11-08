import { EmptyField } from "./empty-field";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { prefersReducedMotion } from "../lib/motion";
import { profile, stats } from "../data/portfolio";

/** Angkanya dianimasikan oleh countUpAll() di App — di sini cuma penanda + nilai akhir. */
function StatValue({ value }: { value: number }) {
  return <span data-count={value}>{prefersReducedMotion() ? value : 0}</span>;
}

export function About() {
  return (
    <Section
      id="tentang"
      index="01"
      eyebrow="Tentang"
      title={profile.name ? `Halo, saya ${profile.name}.` : "Tentang saya"}
      intro={
        profile.tagline ? (
          <p>{profile.tagline}</p>
        ) : (
          <EmptyField path="profile.tagline" />
        )
      }
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_2fr] lg:gap-20">
        <dl className="grid grid-cols-2 gap-8 self-start lg:grid-cols-1 lg:gap-10">
          {stats.map((stat, order) => (
            <Reveal key={stat.label} delay={order * 90}>
              <div>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="display text-[clamp(2.6rem,7vw,4.5rem)] text-primary">
                  <StatValue value={stat.value} />
                </dd>
                <p className="label mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {profile.bio.length ? (
            profile.bio.map((paragraph, order) => (
              <Reveal key={order} delay={order * 80}>
                <p className={order === 0 ? "text-foreground" : undefined}>{paragraph}</p>
              </Reveal>
            ))
          ) : (
            <Reveal>
              <EmptyField path="profile.bio" />
              <p className="mt-5 max-w-2xl">
                Isi 2–3 paragraf: latar belakangmu, apa yang kamu kerjakan sekarang, dan jenis
                project yang ingin kamu terima. Ganti contoh di{" "}
                <code className="font-mono text-base text-foreground">src/data/portfolio.ts</code>.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
