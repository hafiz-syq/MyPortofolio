import { useCallback, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { animate } from "animejs";
import { Button } from "@/components/ui/button";
import { EmptyField } from "./empty-field";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { prefersReducedMotion } from "../lib/motion";
import { useLocale } from "../i18n/locale";
import type { Project } from "../data/portfolio";

const ALL = "__all__";

/**
 * Filter baris + FLIP: posisi lama diukur sebelum filter berubah, lalu anime.js
 * menutup selisihnya supaya baris terlihat berpindah, bukan melompat.
 */
function useFlipRows(active: string, shown: Set<string>) {
  const nodes = useRef(new Map<string, HTMLElement>());
  const previous = useRef(new Map<string, DOMRect>());

  const register = useCallback((title: string, node: HTMLElement | null) => {
    if (node) nodes.current.set(title, node);
    else nodes.current.delete(title);
  }, []);

  useLayoutEffect(() => {
    const next = new Map<string, DOMRect>();
    const reduced = prefersReducedMotion();
    for (const [title, node] of nodes.current) {
      if (node.hidden) continue;
      const rect = node.getBoundingClientRect();
      next.set(title, rect);
      if (reduced) continue;
      const before = previous.current.get(title);
      if (!before) {
        animate(node, { opacity: [0, 1], translateY: [20, 0], duration: 520, ease: "outExpo" });
        continue;
      }
      const delta = before.top - rect.top;
      if (Math.abs(delta) > 1) {
        animate(node, { translateY: [delta, 0], duration: 640, ease: "outExpo" });
      }
    }
    previous.current = next;
  }, [active, shown]);

  return register;
}

function ProjectLinks({ project, order }: { project: Project; order: number }) {
  if (!project.links.length) {
    return <EmptyField path={`projects[${order}].links`} />;
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {project.links.map((link) => (
        <li key={link.url}>
          <Button asChild size="sm" variant={/kode|code/i.test(link.label) ? "outline" : "default"} className="rounded-full px-5">
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}

type RowProps = {
  project: Project;
  order: number;
  isShown: boolean;
  register: (title: string, node: HTMLElement | null) => void;
};

function ProjectRow({ project, order, isShown, register }: RowProps) {
  const { ui } = useLocale();
  const setNode = useCallback(
    (node: HTMLDivElement | null) => {
      register(project.title, node);
    },
    [project.title, register],
  );

  return (
    <Reveal delay={order * 70} className="group" hidden={!isShown} elementRef={setNode}>
      <article className="hover-lift grid gap-6 border-t border-border py-8 sm:grid-cols-[5rem_1fr] sm:gap-10 sm:py-10 lg:grid-cols-[7rem_1fr_10rem]">
        <span
          aria-hidden="true"
          className="stroke-text display text-[clamp(2.6rem,8vw,5rem)] leading-none"
        >
          {String(order + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="display text-[clamp(1.6rem,4.4vw,2.8rem)] group-hover:text-primary">
              {project.title}
            </h3>
            {project.featured ? (
              <span className="label bg-primary px-2 py-1 text-primary-foreground">{ui.projects.featured}</span>
            ) : null}
            {project.year ? (
              <span className="label text-muted-foreground">{project.year}</span>
            ) : null}
          </div>

          {project.role ? (
            <p className="label mt-3 text-muted-foreground">{project.role}</p>
          ) : null}

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="label border border-border px-2.5 py-1 text-muted-foreground"
                style={{ borderRadius: "calc(var(--site-radius) - 8px)" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-1">
          <ProjectLinks project={project} order={order} />
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const { ui, content } = useLocale();
  const chips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of content.projects) {
      for (const item of project.stack) counts.set(item, (counts.get(item) ?? 0) + 1);
    }
    return [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name]) => name)];
  }, [content.projects]);

  const [active, setActive] = useState(ALL);
  const shown = useMemo(
    () =>
      new Set(
        active === ALL
          ? content.projects.map((project) => project.title)
          : content.projects
              .filter((project) => project.stack.includes(active))
              .map((project) => project.title),
      ),
    [active, content.projects],
  );
  const register = useFlipRows(active, shown);

  const pick = (chip: string, event: MouseEvent<HTMLButtonElement>) => {
    setActive(chip);
    if (!prefersReducedMotion()) {
      animate(event.currentTarget, { scale: [0.9, 1], duration: 520, ease: "outElastic(1, 0.4)" });
    }
  };

  return (
    <Section
      id="project"
      index="02"
      eyebrow={ui.nav.work}
      title={ui.projects.title}
      intro={<p>{ui.projects.intro(content.projects.length)}</p>}
    >
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            className="filter-chip"
            data-active={chip === active}
            onClick={(event) => pick(chip, event)}
          >
            {chip === ALL ? ui.projects.all : chip}
          </button>
        ))}
        <span role="status" aria-live="polite" className="label ml-auto text-muted-foreground">
          {ui.projects.shown(shown.size, content.projects.length)}
        </span>
      </div>

      <div className="mt-10 border-b border-border">
        {content.projects.map((project, order) => (
          <ProjectRow
            key={project.title}
            project={project}
            order={order}
            isShown={shown.has(project.title)}
            register={register}
          />
        ))}
      </div>
    </Section>
  );
}
