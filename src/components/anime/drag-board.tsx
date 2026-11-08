import { useEffect, useRef } from "react";
import { createDraggable, type Draggable } from "animejs";
import { prefersReducedMotion } from "../../lib/motion";

type Sticker = {
  label: string;
  x: number;
  y: number;
};

/** Papan stiker: Draggable anime.js dengan snap grid dan release elastic. */
export function DragBoard({ stickers }: { stickers: Sticker[] }) {
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area || prefersReducedMotion()) return;
    const instances: Draggable[] = Array.from(
      area.querySelectorAll<HTMLElement>("[data-sticker]"),
    ).map((node) =>
      createDraggable(node, {
        x: true,
        y: true,
        container: area,
        containerPadding: 6,
        snap: 26,
        cursor: { onGrab: "grabbing", onHover: "grab" },
        releaseEase: "outElastic(1, 0.55)",
      }),
    );
    return () => {
      for (const instance of instances) instance.revert();
    };
  }, []);

  return (
    <div
      ref={areaRef}
      className="drag-area relative h-64 overflow-hidden border border-border sm:h-72"
      style={{ borderRadius: "var(--site-radius)" }}
    >
      {stickers.map((sticker) => (
        <span
          key={sticker.label}
          data-sticker
          className="sticker label absolute"
          style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
        >
          {sticker.label}
        </span>
      ))}
    </div>
  );
}
