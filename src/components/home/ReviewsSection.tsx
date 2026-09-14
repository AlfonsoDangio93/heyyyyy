import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { REVIEWS, TRUSTPILOT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";

/** Stella a cinque punte, la forma del marchio Trustpilot. */
const STAR =
  "M12.00,2.40L14.32,8.80L21.13,9.03L15.76,13.22L17.64,19.77L12.00,15.95L6.36,19.77L8.24,13.22L2.87,9.03L9.68,8.80Z";

/**
 * Le stelle di Trustpilot sono bianche dentro un quadrato verde, non stelle
 * verdi su fondo chiaro: e' quel blocco di colore a renderle riconoscibili.
 */
const Stars = ({ rating, size = "h-6 w-6" }: { rating: number; size?: string }) => (
  <span className="flex gap-0.5" role="img" aria-label={`${rating} stelle su 5`}>
    {Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        aria-hidden="true"
        className={cn("flex items-center justify-center rounded-[2px]", size)}
        style={{ backgroundColor: index < rating ? TRUSTPILOT.green : "hsl(var(--muted-foreground) / 0.25)" }}
      >
        <svg viewBox="0 0 24 24" className="h-[78%] w-[78%] fill-white">
          <path d={STAR} />
        </svg>
      </span>
    ))}
  </span>
);

/**
 * Marchio Trustpilot: **solo il nome**. La stella singola che lo precedeva e'
 * stata tolta su richiesta: le cinque stelle verdi accanto al punteggio e su
 * ogni scheda dicono gia' tutto, una sesta stella nera faceva confusione.
 */
const TrustpilotMark = ({ className }: { className?: string }) => (
  <span className={cn("text-fluid-base font-bold tracking-tight text-primary", className)}>
    Trustpilot
  </span>
);

/** Tinte degli avatar: prese dai token, una per recensione a rotazione. */
const AVATAR_TONES = [
  "bg-primary text-primary-foreground",
  "bg-highlight text-highlight-foreground",
  "bg-graphite text-white",
  "bg-secondary-strong text-primary",
];

/**
 * Recensioni vere, quelle pubblicate sulla scheda Trustpilot di HeyLucy.
 * Testo e dati stanno in `constants.ts`, qui c'e' solo la resa.
 *
 * Struttura presa dalla sezione recensioni del riferimento: nastro orizzontale
 * di schede che sborda dal bordo, riga di numeri sotto. Al posto del badge con
 * il risultato ci sono le stelle, che sono il dato che conta qui.
 */
const ReviewsSection = () => {
  const { t } = useTranslation();

  // Nastro continuo: due giri di recensioni per meta', duplicati. Meta' nastro
  // e' largo circa 3500px, quindi copre qualunque finestra e il ritorno non si
  // vede. L'animazione trasla del 50%, cioe' esattamente la prima meta'.
  const half = [...REVIEWS, ...REVIEWS];
  const track = [...half, ...half];

  return (
    <section className="bg-accent py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading align="left" rule={false} className="max-w-[820px]">
            {t("home.reviews.title")}
          </SectionHeading>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Stars rating={5} size="h-5 w-5" />
            <span className="text-fluid-base font-bold text-primary">{TRUSTPILOT.score}</span>
            <span className="text-fluid-sm text-muted-foreground">
              {t("home.reviews.scoreLabel")}
            </span>
          </div>
        </Reveal>

      </div>

      {/* Nastro a tutta finestra: sta fuori dal contenitore apposta, cosi' le
          schede scorrono da bordo a bordo e non dentro una scatola.
          ⚠️ **Non si ferma al passaggio del mouse.** La pausa c'era ed e' stata
          tolta su richiesta: chi vuole leggere con calma ha il bottone verso
          Trustpilot. Non rimetterla. */}
      <Reveal delay={120} className="relative mt-14 w-full overflow-hidden md:mt-20">
        <ul className="flex w-max animate-marquee gap-4 [animation-duration:62s] motion-reduce:animate-none">
          {track.map((review, index) => (
            <li
              key={`${review.name}-${index}`}
              aria-hidden={index >= half.length}
              className="w-[17rem] shrink-0 sm:w-[18rem]"
            >
              <article className="flex h-full flex-col rounded-card border border-card-border/10 bg-background p-4 shadow-card md:p-5">
                <Stars rating={review.rating} size="h-5 w-5" />

                {review.title && (
                  <h3 className="mt-3.5 text-fluid-sm font-bold leading-snug text-primary">
                    {review.title}
                  </h3>
                )}
                {review.body && (
                  // Cinque righe e poi i puntini: la recensione piu' lunga ne
                  // occupa dodici e allungava tutte le schede. Il testo intero
                  // resta nel DOM, il taglio e' solo visivo.
                  <p className="mt-2 line-clamp-5 text-fluid-sm leading-relaxed text-muted-foreground">
                    {review.body}
                  </p>
                )}

                {/* `mt-auto` incolla la firma in fondo: le recensioni sono
                    lunghe in modo diverso e senza questo gli avatar finivano a
                    quote diverse da una scheda all'altra. */}
                <div className="mt-auto flex items-center gap-2.5 pt-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-fluid-sm font-bold",
                      AVATAR_TONES[index % AVATAR_TONES.length],
                    )}
                  >
                    {review.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-fluid-sm font-bold text-primary">
                      {review.name}
                    </span>
                    {/* Solo la data: la dicitura «Su invito» e' stata tolta su
                        richiesta. Il dato resta in `constants.ts`, perche' e' un
                        fatto della recensione e Trustpilot la marca cosi' sulla
                        sua scheda. */}
                    <span className="block text-xs text-muted-foreground">{review.date}</span>
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={180}>
          <div className="mt-12 flex flex-col items-center gap-6 md:mt-14">
            <a
              href={TRUSTPILOT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-background px-6 py-3 text-fluid-sm font-semibold text-primary transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
            >
              {t("home.reviews.cta")}
              {/* ⚠️ Il marchio non si nasconde sul mobile: l'etichetta finisce
                  con «su» e senza il nome la frase resta a meta'. */}
              <TrustpilotMark />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ReviewsSection;
