import { useLayoutEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import { prefersReducedMotion } from "../../lib/motion";

/** Judul dipecah per karakter lalu dilepas dengan spring — demo "text splitting" anime.js. */
export function SplitHeadline({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const splitter = splitText(el, { chars: { class: "char" } });
    const anim = animate(splitter.chars, {
      opacity: [0, 1],
      translateY: [115, 0],
      rotate: [7, 0],
      duration: 1300,
      delay: stagger(32, { from: "first", ease: "outQuad" }),
      ease: "spring(1, 90, 12, 0)",
    });
    return () => {
      anim.pause();
      splitter.revert();
    };
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {lines.map((line, order) => (
        <span key={`${line}-${order}`} className={order % 2 === 1 ? "block text-primary" : "block"}>
          {line}
        </span>
      ))}
    </h1>
  );
}
