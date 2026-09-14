import { cn } from "@/lib/utils";

interface FramedImageProps {
  src: string;
  alt: string;
  /** Colore del blocco decorativo sfalsato dietro l'immagine. */
  accent?: "primary" | "highlight" | "secondary-strong";
  /**
   * "cover" riempie un contenitore di altezza fissa e ritaglia quello che
   * avanza: va bene per le foto. "natural" lascia all'immagine le sue
   * proporzioni e non taglia niente: obbligatorio per gli screenshot di
   * prodotto, dove un ritaglio mangia titoli e pulsanti.
   */
  fit?: "cover" | "natural";
  className?: string;
  imageClassName?: string;
  loading?: "lazy" | "eager";
}

const ACCENTS = {
  primary: "bg-primary",
  highlight: "bg-highlight",
  "secondary-strong": "bg-secondary-strong",
} as const;

/**
 * Immagine con bordo marcato e blocco pieno sfalsato dietro, per darle peso
 * grafico. Il blocco usa i colori di brand, mai tinte fuori palette.
 */
const FramedImage = ({
  src,
  alt,
  accent = "primary",
  fit = "cover",
  className,
  imageClassName,
  loading = "lazy",
}: FramedImageProps) => (
  <div className={cn("relative", className)}>
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] md:translate-x-4 md:translate-y-4",
        ACCENTS[accent],
      )}
    />
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border-[3px] border-primary bg-background",
        fit === "cover" && "h-full",
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn(
          "w-full",
          fit === "cover" ? "h-full object-cover" : "block h-auto",
          imageClassName,
        )}
      />
    </div>
  </div>
);

export default FramedImage;
