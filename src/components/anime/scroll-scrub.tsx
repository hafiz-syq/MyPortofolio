import { useEffect, useRef } from "react";
import { createTimeline, onScroll } from "animejs";
import { prefersReducedMotion } from "../../lib/motion";

/** Strip proses yang di-scrub oleh posisi scroll: timeline + ScrollObserver (sync). */
export function ScrollScrub({ steps }: { steps: string[] }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || prefersReducedMotion()) return;
    const items = Array.from(host.querySelectorAll<HTMLElement>("[data-step]"));
    const track = host.querySelector<HTMLElement>("[data-track]");
    const tl = createTimeline({ autoplay: onScroll({ target: host, enter: 0, leave: 1, sync: true }) });
    if (track) tl.add(track, { scaleX: [0, 1], duration: 200, ease: "linear" }, 0);
    tl.add(items, {
      opacity: [0.2, 1],
      translateY: [26, 0],
      duration: 160,
      ease: "outQuad",
    });
    return () => {
      tl.pause();
      tl.revert();
    };
  }, []);

  return (
    <div ref={hostRef} className="scrub">
      <div className="scrub-rail">
        <div data-track className="scrub-track" />
      </div>
      <ol className="scrub-steps">
        {steps.map((step, order) => (
          <li key={step} data-step className="label scrub-step">
            <span className="scrub-index">{String(order + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
