import { useEffect, useRef } from "react";
import { animate, stagger, type JSAnimation } from "animejs";
import { cn } from "@/lib/utils";
import { prefersReducedMotion, whenIdle } from "../../lib/motion";

const SPACING = 46;
const MAX_COLS = 22;
const MAX_ROWS = 8;

function setup(host: HTMLElement) {
  let dots: HTMLElement[] = [];
  let cols = 1;
  let rows = 1;
  let current: JSAnimation | null = null;

  const build = () => {
    const box = host.getBoundingClientRect();
    cols = Math.min(MAX_COLS, Math.max(6, Math.round(box.width / SPACING)));
    rows = Math.min(MAX_ROWS, Math.max(4, Math.round(box.height / SPACING)));
    host.style.setProperty("--grid-cols", String(cols));
    host.style.setProperty("--grid-rows", String(rows));
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < cols * rows; index += 1) {
      const dot = document.createElement("span");
      dot.className = "grid-dot";
      fragment.appendChild(dot);
    }
    host.replaceChildren(fragment);
    dots = Array.from(host.querySelectorAll<HTMLElement>(".grid-dot"));
  };

  build();

  let frame = 0;
  const ripple = (cellX: number, cellY: number) => {
    current?.pause();
    current = animate(dots, {
      scale: [1, 2.6, 1],
      opacity: [0.22, 1, 0.22],
      duration: 950,
      ease: "outQuad",
      delay: stagger(58, { grid: [cols, rows], from: [cellX, cellY], ease: "outQuad" }),
    });
  };

  const onPointerMove = (event: PointerEvent) => {
    const now = performance.now();
    if (now - frame < 150) return;
    const box = host.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    ) {
      return;
    }
    frame = now;
    ripple(
      Math.floor(((event.clientX - box.left) / box.width) * cols),
      Math.floor(((event.clientY - box.top) / box.height) * rows),
    );
  };

  const observer = new ResizeObserver(build);
  observer.observe(host);
  window.addEventListener("pointermove", onPointerMove);

  return () => {
    observer.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    current?.pause();
  };
}

/** Kisi titik ala demo "stagger grid" anime.js: riak muncul dari posisi kursor. */
export function StaggerGrid({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (prefersReducedMotion()) {
      host.style.display = "none";
      return;
    }
    let stop: (() => void) | undefined;
    const cancel = whenIdle(() => {
      stop = setup(host);
    });
    return () => {
      cancel();
      stop?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn("stagger-grid pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}
