import { animate, type JSAnimation } from "animejs";

/**
 * True kalau HTML sudah bawa markup hasil prerender: kontennya ter-paint lebih dulu,
 * jadi animasi masuk tidak boleh memadamkannya lagi (kelihatan kedip).
 */
export const hasPrerenderedShell =
  typeof document !== "undefined" && Boolean(document.getElementById("root")?.firstElementChild);

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Menjalankan setup berat satu frame setelah mount, lalu saat CPU sedang kosong.
 * Kenapa: createDrawable/morphTo membaca geometri SVG dan kisi titik membaca
 * rect, dan keduanya memaksa layout di tengah proses mount React — itu muncul
 * sebagai forced reflow + menambah Total Blocking Time di Lighthouse mobile.
 * Kalau host diisi (komponen di bawah lipatan), setup menunggu elemen terlihat:
 * papan drag atau loop morph tidak perlu memakan main thread sebelum dipakai.
 */
export function whenIdle(run: () => void, host?: Element) {
  let cancelRun: () => void = () => {};
  const schedule = () => {
    const raf = requestAnimationFrame(() => {
      if (typeof window.requestIdleCallback === "function") {
        const handle = window.requestIdleCallback(run, { timeout: 1200 });
        cancelRun = () => window.cancelIdleCallback(handle);
      } else {
        const timer = window.setTimeout(run, 180);
        cancelRun = () => window.clearTimeout(timer);
      }
    });
    cancelRun = () => cancelAnimationFrame(raf);
  };
  if (host) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        schedule();
      },
      { rootMargin: "100px" },
    );
    observer.observe(host);
    return () => {
      observer.disconnect();
      cancelRun();
    };
  }
  schedule();
  return () => cancelRun();
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
