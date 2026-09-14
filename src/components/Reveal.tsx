import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const HIDDEN: Record<Direction, string> = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "translate-x-10",
  right: "-translate-x-10",
  scale: "scale-95",
  fade: "",
};

interface RevealProps {
  children: ReactNode;
  /** Ritardo in ms, per scaglionare gli elementi di uno stesso gruppo. */
  delay?: number;
  direction?: Direction;
  duration?: number;
  threshold?: number;
  /** true: rientra risalendo la pagina, invece di restare visibile per sempre. */
  repeat?: boolean;
  className?: string;
  as?: ElementType;
}

/**
 * Rivela il contenuto quando entra nel viewport. Un solo elemento animato per
 * istanza: se il figlio ha già una sua transizione (es. hover:shadow-soft),
 * usare Reveal come wrapper e non come elemento stilizzato, così le due
 * transizioni non si sovrascrivono.
 */
const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  duration = 700,
  threshold = 0.15,
  repeat = false,
  className,
  as: Tag = "div",
}: RevealProps) => {
  const { ref, isVisible } = useScrollAnimation(threshold, repeat);
  const reduced = useReducedMotion();
  const shown = reduced || isVisible;

  return (
    <Tag
      ref={ref}
      style={{
        transitionDuration: reduced ? "0ms" : `${duration}ms`,
        transitionDelay: shown && !reduced ? `${delay}ms` : "0ms",
      }}
      className={cn(
        "transition-[opacity,transform] ease-reveal will-change-[opacity,transform]",
        shown ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 ${HIDDEN[direction]}`,
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
