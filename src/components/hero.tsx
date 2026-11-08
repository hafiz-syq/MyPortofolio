import { useRef, type CSSProperties, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EmptyField } from "./empty-field";
import { Magnetic } from "./anime/magnetic";
import { ScrambleRole } from "./anime/scramble-role";
import { SplitHeadline } from "./anime/split-headline";
import { StaggerGrid } from "./anime/stagger-grid";
import { profile, projects, tickerItems } from "../data/portfolio";

const nameWords = profile.name.trim().split(/\s+/).filter(Boolean);
const nameLines = profile.nameLines.length
  ? profile.nameLines
  : nameWords.length
    ? nameWords
    : ["Nama", "Kamu"];

function Ticker() {
  const row = (ariaHidden: boolean) => (
    <ul
      className="ticker-track shrink-0 items-center gap-8 pr-8"
      aria-hidden={ariaHidden || undefined}
    >
      {tickerItems.map((item) => (
        <li key={item} className="label flex items-center gap-8 whitespace-nowrap text-muted-foreground">
          {item}
          <span className="text-primary" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-border bg-secondary/40 py-4">
      <div className="ticker flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const spotRef = useRef<HTMLElement>(null);

  const trackPointer = (event: MouseEvent<HTMLElement>) => {
    const node = spotRef.current;
    if (!node || reduced) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - box.left}px`);
    node.style.setProperty("--my", `${event.clientY - box.top}px`);
  };

  return (
    <section
      id="atas"
      ref={spotRef}
      onMouseMove={trackPointer}
      className="relative flex min-h-dvh flex-col justify-between overflow-hidden pt-28"
    >
      <StaggerGrid className="opacity-70" />
      <div className="spotlight pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="glow-blob"
        aria-hidden="true"
        style={
          {
            width: "46vw",
            height: "46vw",
            top: "-12%",
            right: "-8%",
            background: "color-mix(in srgb, var(--site-accent) 16%, transparent)",
          } as CSSProperties
        }
      />
      <div
        className="glow-blob"
        aria-hidden="true"
        style={
          {
            width: "38vw",
            height: "38vw",
            bottom: "4%",
            left: "-10%",
            background: "color-mix(in srgb, var(--site-hot) 14%, transparent)",
            animationDelay: "-6s",
          } as CSSProperties
        }
      />

      <p
        className="label pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 text-muted-foreground xl:block"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        Portofolio · {new Date().getFullYear()}
      </p>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-8 px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {profile.status ? (
            <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5">
              <span className="dot-live inline-block size-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="label text-muted-foreground">{profile.status}</span>
            </span>
          ) : (
            <EmptyField path="profile.status" />
          )}
          {profile.location ? (
            <span className="label border border-border px-3 py-1.5 text-muted-foreground">
              {profile.location}
            </span>
          ) : null}
        </div>

        <SplitHeadline lines={nameLines} className="display text-[clamp(3rem,13vw,13.5rem)]" />

        <div className="flex min-h-8 items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-20" />
          {profile.roles.length > 1 ? (
            <ScrambleRole
              words={profile.roles}
              className="display text-[clamp(1.1rem,3vw,2.2rem)] text-muted-foreground"
            />
          ) : profile.roles.length === 1 ? (
            <span className="display text-[clamp(1.1rem,3vw,2.2rem)] text-muted-foreground">
              {profile.roles[0]}
            </span>
          ) : (
            <EmptyField path="profile.roles" />
          )}
        </div>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {profile.tagline ||
            "Satu baris tentang apa yang kamu bangun dan untuk siapa — tulis di tagline di src/data/portfolio.ts."}
        </p>

        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="#project">
                Lihat project
                <span aria-hidden="true">↓</span>
              </a>
            </Button>
          </Magnetic>
          <Magnetic strength={0.24}>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7">
              <a href="#kontak">Ngobrol dulu</a>
            </Button>
          </Magnetic>
          {profile.resumeUrl ? (
            <Magnetic strength={0.24}>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-7">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  Unduh CV
                </a>
              </Button>
            </Magnetic>
          ) : null}
        </div>
      </div>

      <div className="relative mt-14">
        <Ticker />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#tentang" className="label flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <span className="scroll-cue inline-block" aria-hidden="true">
              ↓
            </span>
            Scroll
          </a>
          <span className="label text-muted-foreground">
            {projects.length} project terpilih
          </span>
        </div>
      </div>
    </section>
  );
}
