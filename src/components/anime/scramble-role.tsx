import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";
import { prefersReducedMotion } from "../../lib/motion";

/** Rotator peran pakai scrambleText resmi anime.js, bukan fade biasa. */
export function ScrambleRole({ words, className }: { words: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length < 2 || prefersReducedMotion()) return;
    let index = 0;
    const id = window.setInterval(() => {
      index = (index + 1) % words.length;
      animate(el, {
        textContent: scrambleText({
          text: words[index],
          chars: "uppercase",
          cursor: true,
          perturbation: 12,
          revealRate: 46,
          ease: "inOutQuad",
        }),
      });
    }, 3400);
    return () => window.clearInterval(id);
  }, [words]);

  return (
    <span ref={ref} className={className}>
      {words[0]}
    </span>
  );
}
