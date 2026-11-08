import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../../lib/motion";

const HOT = "a, button, [data-sticker], [data-magnetic]";

/** Cincin kursor yang mengikuti pointer dengan easing spring anime.js. */
export function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) {
      el.style.display = "none";
      return;
    }

    const follow = (event: PointerEvent) => {
      animate(el, {
        translateX: event.clientX,
        translateY: event.clientY,
        duration: 700,
        ease: "spring(1, 70, 14, 0)",
      });
    };

    // Warna cincin ikut token CSS, jadi anime.js hanya mengurusi geraknya.
    const grow = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(HOT)) {
        el.dataset.hot = "true";
        animate(el, { scale: 2.4, duration: 320, ease: "outQuad" });
      }
    };
    const shrink = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(HOT)) {
        delete el.dataset.hot;
        animate(el, { scale: 1, duration: 420, ease: "outQuad" });
      }
    };

    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("pointerover", grow, { passive: true });
    window.addEventListener("pointerout", shrink, { passive: true });
    return () => {
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("pointerover", grow);
      window.removeEventListener("pointerout", shrink);
    };
  }, []);

  return <div ref={ref} className="cursor-ring" aria-hidden="true" />;
}
