import { useEffect, useRef } from "react";
import { animate, createDrawable, stagger, type JSAnimation } from "animejs";
import { prefersReducedMotion, whenIdle, whenVisible } from "../../lib/motion";

/** SVG yang menggambar dirinya sendiri: createDrawable + stroke-dash lewat anime.js. */
export function LineDraw({ label }: { label: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || prefersReducedMotion()) return;
    let stop: (() => void) | undefined;
    const cancel = whenIdle(() => {
      const shapes = createDrawable(host.querySelectorAll("path, circle, line"));
      let animation: JSAnimation | null = null;
      const stopObserving = whenVisible(host, "svg", 0.45, () => {
        animation = animate(shapes, {
          draw: "0 1",
          duration: 1700,
          ease: "inOutQuad",
          delay: stagger(160),
        });
      });
      stop = () => {
        stopObserving();
        if (animation) {
          animation.pause();
          animation.revert();
        }
      };
    }, host);
    return () => {
      cancel();
      stop?.();
    };
  }, []);

  return (
    <figure ref={hostRef} className="line-draw">
      <svg viewBox="0 0 300 200" role="img" aria-label={label}>
        <g fill="none" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="150" cy="100" r="62" className="ink" />
          <path d="M40 150 C 95 165, 120 60, 175 55" className="ink" />
          <path d="M175 55 l -18 6 m 18 -6 l -8 17" className="accent" />
          <path d="M60 178 Q 150 196 250 168" className="ink" />
          <line x1="214" y1="42" x2="258" y2="42" className="accent" />
          <line x1="236" y1="20" x2="236" y2="64" className="accent" />
        </g>
      </svg>
      <figcaption className="label mt-4 text-muted-foreground">{label}</figcaption>
    </figure>
  );
}
