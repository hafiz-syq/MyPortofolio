import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

export function Section({ id, index, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="label text-muted-foreground">{index}</span>
            <span className="label text-primary">{eyebrow}</span>
          </div>
          <h2 className="display mt-5 max-w-4xl text-[clamp(2.1rem,6vw,5rem)]">{title}</h2>
          {intro ? (
            <div className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{intro}</div>
          ) : null}
        </Reveal>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
