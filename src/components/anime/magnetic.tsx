import { useEffect, useRef, type ReactNode } from "react";
import { magnetic } from "../../lib/motion";

export function Magnetic({ children, strength }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return magnetic(el, strength);
  }, [strength]);

  return (
    <span ref={ref} data-magnetic className="inline-block will-change-transform">
      {children}
    </span>
  );
}
