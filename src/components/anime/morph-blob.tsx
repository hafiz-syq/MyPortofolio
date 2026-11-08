import { useEffect, useRef } from "react";
import { createTimeline, morphTo } from "animejs";
import { prefersReducedMotion } from "../../lib/motion";

const SHAPES = [
  "M150 22 C 232 22 280 72 278 150 C 276 230 228 280 150 278 C 72 276 22 230 22 150 C 22 72 68 22 150 22 Z",
  "M158 40 C 250 34 272 96 262 164 C 252 240 198 272 136 264 C 68 256 32 206 38 142 C 44 78 84 46 158 40 Z",
  "M142 30 C 226 60 286 100 268 172 C 252 238 190 286 124 268 C 60 250 26 194 40 128 C 54 62 92 6 142 30 Z",
];

/**
 * Blob yang berubah bentuk dengan morphTo. anime.js menuntut target bentuknya
 * berupa elemen SVG (bukan string d), jadi semua bentuk ikut dirender di dalam
 * <g class="morph-source"> yang tidak terlihat tapi tetap punya geometri.
 */
export function MorphBlob({ tone = "accent" }: { tone?: "accent" | "hot" }) {
  const hostRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = hostRef.current;
    if (!svg || prefersReducedMotion()) return;
    const target = svg.querySelector<SVGPathElement>("[data-morph]");
    const sources = Array.from(svg.querySelectorAll<SVGPathElement>("[data-shape]"));
    if (!target || sources.length < 2) return;
    const timeline = createTimeline({ loop: true });
    for (let index = 1; index <= sources.length; index += 1) {
      timeline.add(target, {
        d: morphTo(sources[index % sources.length], 0.12),
        duration: 2600,
        ease: "inOutSine",
      });
    }
    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <svg ref={hostRef} viewBox="0 0 300 300" className="morph-blob" aria-hidden="true" focusable="false">
      <path data-morph d={SHAPES[0]} data-tone={tone} />
      <g className="morph-source">
        {SHAPES.map((shape) => (
          <path key={shape} data-shape d={shape} />
        ))}
      </g>
    </svg>
  );
}
