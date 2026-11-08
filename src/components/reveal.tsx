import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hidden?: boolean;
  elementRef?: Ref<HTMLDivElement>;
};

/** Penanda saja — yang menggerakkan adalah ScrollObserver anime.js di lib/motion. */
export function Reveal({ children, className, delay, hidden, elementRef }: RevealProps) {
  return (
    <div ref={elementRef} data-reveal data-reveal-delay={delay} hidden={hidden} className={cn(className)}>
      {children}
    </div>
  );
}
