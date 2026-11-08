import { animate, type JSAnimation } from "animejs";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Pemicu berbasis IntersectionObserver, bukan onScroll per-elemen.
 * Kenapa: ScrollObserver anime.js hanya mengevaluasi di dalam rentang
 * offsetStart..offsetEnd milik elemennya, jadi lompatan scroll (klik
 * navigasi, tombol End, scroll cepat) membuat elemen terlewat dan konten
 * tertinggal tak terlihat. Animasinya sendiri tetap jalan dengan anime.js.
 */
export function whenVisible(
  root: ParentNode,
  selector: string,
  ratio: number,
  run: (el: HTMLElement) => void,
) {
  const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
  if (!targets.length) return () => {};
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: ratio, rootMargin: "0px 0px -6% 0px" },
  );
  for (const el of targets) observer.observe(el);
  return () => observer.disconnect();
}

export function revealAll(root: ParentNode) {
  const animations: JSAnimation[] = [];
  let index = 0;
  const stopObserving = whenVisible(root, "[data-reveal]", 0.15, (el) => {
    const delay = Number(el.dataset.revealDelay ?? (index % 5) * 80);
    index += 1;
    animations.push(
      animate(el, {
        opacity: [0, 1],
        translateY: [44, 0],
        duration: 900,
        delay,
        ease: "outExpo",
      }),
    );
  });
  return () => {
    for (const animation of animations) {
      animation.pause();
      animation.revert();
    }
    stopObserving();
  };
}

export function countUpAll(root: ParentNode) {
  const animations: JSAnimation[] = [];
  const stopObserving = whenVisible(root, "[data-count]", 0.4, (el) => {
    const to = Number(el.dataset.count);
    if (!Number.isFinite(to)) return;
    if (prefersReducedMotion()) {
      el.textContent = String(to);
      return;
    }
    const holder = { value: 0 };
    el.textContent = "0";
    animations.push(
      animate(holder, {
        value: to,
        duration: 1600,
        ease: "outQuint",
        onUpdate: () => {
          el.textContent = String(Math.round(holder.value));
        },
      }),
    );
  });
  return () => {
    for (const animation of animations) {
      animation.pause();
      animation.revert();
    }
    stopObserving();
  };
}

/** Tombol magnetik: mendekat ke pointer lalu pulang dengan elastic. */
export function magnetic(el: HTMLElement, strength = 0.32) {
  const move = (event: PointerEvent) => {
    if (prefersReducedMotion()) return;
    const box = el.getBoundingClientRect();
    animate(el, {
      translateX: (event.clientX - (box.left + box.width / 2)) * strength,
      translateY: (event.clientY - (box.top + box.height / 2)) * strength,
      duration: 420,
      ease: "outQuint",
    });
  };
  const reset = () => {
    animate(el, { translateX: 0, translateY: 0, duration: 700, ease: "outElastic(1, 0.55)" });
  };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", reset);
  return () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", reset);
  };
}
