import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CALENDAR_CTA_URL } from "@/lib/constants";

interface CtaButtonProps {
  children: ReactNode;
  /** Default: la pagina di prenotazione su Google Calendar. */
  href?: string;
  /** "light" su fondo scuro: un bottone petrolio su petrolio sparirebbe. */
  tone?: "brand" | "light";
  className?: string;
}

/**
 * CTA primaria del sito: sollevamento, alone brand e riflesso che attraversa
 * il bottone al passaggio del mouse. Unico punto in cui è definito lo stile.
 */
const CtaButton = ({ children, href = CALENDAR_CTA_URL, tone = "brand", className }: CtaButtonProps) => (
  <Button
    asChild
    size="lg"
    className={cn(
      "group relative overflow-hidden rounded-pill px-8 text-fluid-base font-semibold transition-all duration-300 hover:-translate-y-0.5",
      tone === "light"
        ? "bg-accent text-primary hover:bg-accent/90 hover:shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.5)]"
        : "hover:shadow-[0_14px_34px_-10px_hsl(var(--primary)/0.6)]",
      className,
    )}
  >
    <a href={href} target="_blank" rel="noopener noreferrer">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
      />
    </a>
  </Button>
);

export default CtaButton;
