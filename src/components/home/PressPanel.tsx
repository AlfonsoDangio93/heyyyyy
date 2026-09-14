import { useEffect, useState } from "react";
import { PRESS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTranslation } from "@/i18n/useTranslation";

/** Ogni quanto scorre alla testata successiva, e quanto dura lo scorrimento. */
const PAUSA = 2400;
const SCORRIMENTO = 600;
/** Altezza di una riga del nastro verticale: deve combaciare con `h-6`. */
const RIGA = 1.5;

const linkClasses =
  "whitespace-nowrap font-semibold text-primary/85 underline decoration-primary/25 underline-offset-[6px] transition-colors duration-200 hover:text-primary hover:decoration-primary";

/**
 * Contenuto della fascia testate. Non e' una `<section>`: la cornice arriva
 * da `className`, cosi' lo stesso blocco puo' stare in una fascia piena o
 * dentro un pannello.
 *
 * Due rese, e non per capriccio: **su schermo stretto il nastro non funziona**.
 * In 358px di pannello il nastro mostrava tre nomi tagliati a meta' dalla
 * maschera, con l'etichetta sopra su una riga sua: sembrava rotto. Da `md` in
 * su lo spazio c'e' e il nastro resta.
 *
 *  - sotto `md`: **nastro verticale**, una testata per volta che scorre via
 *    verso l'alto ogni 2,4 secondi e lascia il posto alla successiva.
 *    Etichetta e nome sulla stessa riga, niente testo tagliato. La lista e'
 *    ripetuta una volta in coda e il ritorno a zero avviene a transizione
 *    spenta: cosi' il giro e' continuo e non si vede rimbalzare indietro
 *  - da `md`: nastro continuo, come prima
 *
 * ⚠️ Le due rese convivono nel DOM ma `hidden` toglie l'una o l'altra anche
 * dall'albero di accessibilita', quindi i link non risultano doppi. Dentro la
 * rotazione, le testate non visibili sono `aria-hidden` e fuori dal giro di
 * tabulazione, altrimenti si navigherebbe su link invisibili.
 *
 * ⚠️ Con `prefers-reduced-motion` il nastro **non parte**: resta fermo sulla
 * prima testata. Un contenuto che cambia da solo e' esattamente cio' che quella
 * preferenza chiede di evitare.
 */
const PressPanel = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  // `corrente` cresce fino al duplicato in coda, poi si torna a zero di scatto:
  // e' quello che rende il giro continuo invece di far tornare indietro la
  // lista davanti agli occhi.
  const [corrente, setCorrente] = useState(0);
  const [scorre, setScorre] = useState(true);

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setInterval(() => setCorrente((i) => i + 1), PAUSA);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (corrente !== PRESS.length) return undefined;
    // Arrivati sul duplicato, si riparte da capo a transizione spenta.
    const id = window.setTimeout(() => {
      setScorre(false);
      setCorrente(0);
    }, SCORRIMENTO);
    return () => window.clearTimeout(id);
  }, [corrente]);

  useEffect(() => {
    if (scorre) return undefined;
    // Riaccendo la transizione al frame dopo, altrimenti il salto a zero
    // verrebbe animato e si vedrebbe la lista rimbalzare indietro.
    const id = window.requestAnimationFrame(() => setScorre(true));
    return () => window.cancelAnimationFrame(id);
  }, [scorre]);

  // La lista ripetuta una volta in coda: l'ultimo passo scorre sul duplicato
  // della prima, cosi' il ritorno a zero non si vede.
  const giro = [...PRESS, PRESS[0]];

  const half = [...PRESS, ...PRESS, ...PRESS];
  const track = [...half, ...half];

  return (
    <div
      className={cn(
        "rounded-card border border-card-border/10 bg-accent px-5 py-4 shadow-soft md:px-8 md:py-5",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2 md:justify-start md:gap-8">
        <span className="shrink-0 text-fluid-sm font-bold text-primary">{t("home.press.title")}</span>

        {/* Sotto md: nastro verticale, una testata per volta che scorre via */}
        <div className="relative h-6 min-w-0 flex-1 overflow-hidden md:hidden">
          <ul
            className="m-0 list-none p-0"
            style={{
              transform: `translateY(-${corrente * RIGA}rem)`,
              transition: scorre && !reduced ? `transform ${SCORRIMENTO}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
            }}
          >
            {giro.map((outlet, index) => {
              // L'ultimo elemento e' il duplicato di chiusura: mai leggibile.
              const attiva = !reduced ? index === corrente % PRESS.length && index < PRESS.length : index === 0;
              return (
                <li
                  key={`${outlet.name}-${index}`}
                  aria-hidden={!attiva}
                  className="flex h-6 items-center"
                >
                  {outlet.url ? (
                    <a
                      href={outlet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={attiva ? undefined : -1}
                      className={cn(linkClasses, "text-fluid-sm")}
                    >
                      {outlet.name}
                    </a>
                  ) : (
                    <span className={cn(linkClasses, "text-fluid-sm")}>{outlet.name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Da md: nastro continuo */}
        <div
          className="group relative hidden w-full overflow-hidden text-fluid-base md:block"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          }}
        >
          <ul className="flex w-max animate-marquee items-center gap-x-10 [animation-duration:34s] group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-x-14">
            {track.map((outlet, index) => (
              <li key={`${outlet.name}-${index}`} aria-hidden={index >= half.length}>
                {outlet.url ? (
                  <a
                    href={outlet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    // I duplicati che chiudono il loop sono aria-hidden, quindi
                    // i loro link vanno tolti dal giro di tabulazione.
                    tabIndex={index >= half.length ? -1 : undefined}
                    className={linkClasses}
                  >
                    {outlet.name}
                  </a>
                ) : (
                  <span className={linkClasses}>{outlet.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PressPanel;
