import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: ReactNode;
  /** "large" per le sezioni che devono dominare la pagina. */
  size?: "default" | "large";
  align?: "center" | "left" | "right";
  /** h1 solo per il titolo principale di una pagina che non ne ha altri. */
  as?: "h1" | "h2";
  /** false per le sezioni che nel design del cliente non hanno il filetto. */
  rule?: boolean;
  /** "light" per i titoli su fondo scuro. */
  tone?: "dark" | "light";
  className?: string;
}

const ALIGN = {
  center: "items-center text-center",
  left: "items-start text-left",
  right: "items-end text-right",
} as const;

/**
 * Titolo di sezione con filetto decorativo tricolore. Il filetto sostituisce
 * il badge pieno usato in precedenza: un rettangolo colorato attorno al testo
 * si legge come un bottone, e questi titoli non sono cliccabili.
 */
const SectionHeading = ({
  children,
  size = "default",
  align = "center",
  as: Tag = "h2",
  rule = true,
  tone = "dark",
  className,
}: SectionHeadingProps) => (
  <div className={cn("flex flex-col gap-5", ALIGN[align], className)}>
    <Tag
      className={cn(
        "font-display font-normal tracking-tight",
        tone === "light" ? "text-accent" : "text-primary",
        size === "large" ? "text-fluid-4xl" : "text-fluid-3xl",
      )}
    >
      {children}
    </Tag>
    {rule && (
      <span aria-hidden="true" className="flex items-center gap-1.5">
        <span className={cn("h-1.5 w-12 rounded-full", tone === "light" ? "bg-accent" : "bg-primary")} />
        <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
        <span className={cn("h-1.5 w-5 rounded-full", tone === "light" ? "bg-secondary" : "bg-secondary-strong")} />
      </span>
    )}
  </div>
);

export default SectionHeading;
