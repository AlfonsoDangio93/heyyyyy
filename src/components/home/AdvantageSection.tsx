import { useState } from "react";
import { Check, X } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import AnimatedNumber from "@/components/home/AnimatedNumber";
import Reveal from "@/components/Reveal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * Confronto fra HeyLucy e una polizza standard, rifatto nel linguaggio a
 * riquadri del resto della home: un rettangolo stondato azzurro pallido che
 * galleggia sulla pagina bianca, come il riquadro petrolio di Coperture extra.
 *
 * Una sola implementazione, non piu' due. Prima c'erano una griglia a tre
 * colonne per il desktop e una lista di card per il mobile, con lo stesso
 * contenuto scritto due volte: ogni ritocco andava fatto in due posti e le due
 * versioni erano gia' divergenti.
 *
 * ⚠️ Le due colonne restano **affiancate anche su mobile**. Incolonnate una
 * sotto l'altra il confronto si perdeva: per sapere se 250 e' meglio o peggio
 * bisognava ricordarsi il numero della scheda precedente. Quello che cambia
 * sotto `md` e' l'etichetta della voce, che scavalca le due colonne e sta
 * sopra invece di stare in una terza colonna a sinistra.
 *
 * Il racconto lo fanno forma **e** colore: la colonna HeyLucy e' petrolio
 * piena, quella della polizza solo contornata. Le due schede bianca-contro-
 * contornata di prima si distinguevano troppo poco.
 *
 * ⚠️ Nella colonna petrolio la spunta e' **crema, non verde**: il verde di
 * `--success` su petrolio fa 1,9:1 e sparisce. Il significato lo porta la
 * colonna, non il colore dell'icona.
 *
 * Evito comunque di dipingere di rosso la colonna del concorrente, che su un
 * sito sanitario suona aggressivo: resta contornata e in grigio.
 */
const AdvantageSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  // Lato mostrato dal comparatore mobile. Su desktop non serve: li' si vedono
  // tutte e due le colonne insieme.
  const [mostraHeyLucy, setMostraHeyLucy] = useState(true);

  const rows = ["row1", "row2", "row3", "row4"];

  return (
    <section className="bg-background px-3 py-3 md:p-4">
      <div className="rounded-card bg-secondary-pale py-16 md:py-24">
        <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading align="left" rule={false} className="max-w-[820px]">
              {t("home.advantage.title")}
            </SectionHeading>
          </Reveal>

          {/* Intestazioni delle due colonne, una volta sola. */}
          <div className="mt-10 hidden grid-cols-2 gap-2 md:mt-14 md:grid md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)] md:gap-4">
            <span aria-hidden="true" className="hidden md:block" />
            <Reveal direction="down" delay={80}>
              <p className="rounded-pill bg-primary px-3 py-2 text-center text-xs font-bold text-primary-foreground md:px-4 md:py-2.5 md:text-fluid-sm">
                {t("home.advantage.heylucy")}
              </p>
            </Reveal>
            <Reveal direction="down" delay={160}>
              <p className="rounded-pill border border-primary/15 px-3 py-2 text-center text-xs font-semibold text-muted-foreground md:px-4 md:py-2.5 md:text-fluid-sm">
                {t("home.advantage.standard")}
              </p>
            </Reveal>
          </div>

          <div className="mt-4 hidden space-y-5 md:block md:space-y-4">
            {rows.map((row, index) => (
              <Reveal key={row} delay={220 + index * 110}>
                {/* ⚠️ Due colonne affiancate **anche su mobile**: incolonnate
                    una sotto l'altra il confronto si perdeva, bisognava
                    ricordarsi il valore di sopra. L'etichetta della voce
                    scavalca le due colonne e sta sopra; da `md` torna nella sua
                    colonna a sinistra. */}
                <div className="grid grid-cols-2 gap-2 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)] md:gap-4">
                  <p className="col-span-2 text-fluid-sm font-bold text-primary md:col-span-1 md:flex md:items-center md:text-fluid-base">
                    {t(`home.advantage.${row}.feature`)}
                  </p>

                  <div className="rounded-lg bg-primary p-3 shadow-card md:p-5">
                    {/* ⚠️ Il testo va avvolto in un suo `span`. In un contenitore
                        flex ogni porzione di testo diventa un elemento a se',
                        e `AnimatedNumber` ne produce tre (prima, numero, dopo):
                        il `gap` si infilava **fra le parole** e a colonna
                        stretta andavano a capo separatamente, con la tilde su
                        una riga e «dipendente» sull'altra. */}
                    <span className="flex items-start gap-1.5 text-xs font-bold text-accent md:gap-2.5 md:text-base">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[3] text-accent md:h-5 md:w-5" />
                      <span>
                        <AnimatedNumber text={t(`home.advantage.${row}.heylucy`)} active={isVisible} />
                      </span>
                    </span>
                  </div>

                  <div className="rounded-lg border border-primary/15 p-3 md:p-5">
                    <span className="flex items-start gap-1.5 text-xs font-medium text-muted-foreground md:gap-2.5 md:text-base">
                      <X className="mt-0.5 h-4 w-4 shrink-0 stroke-[3] text-muted-foreground/60 md:h-5 md:w-5" />
                      <span>
                        <AnimatedNumber text={t(`home.advantage.${row}.standard`)} active={isVisible} />
                      </span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Comparatore mobile: un interruttore e i valori che scorrono.
              Affiancate, le due colonne su 390px lasciavano 161px per parte e
              ogni valore andava su due o tre righe. Cosi' ogni valore ha tutta
              la larghezza, e il confronto diventa un gesto invece che una
              lettura a zig zag.

              ⚠️ Due rese, ma **un solo elenco di dati**: `rows` e le chiavi
              i18n sono le stesse, cambia solo come vengono disposte. Non e' il
              vecchio errore delle due implementazioni con il contenuto scritto
              due volte. */}
          <div className="mt-8 md:hidden">
            <div className="relative flex rounded-pill border border-primary/15 bg-background p-1">
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-pill bg-primary transition-transform duration-300 ease-spring motion-reduce:transition-none"
                style={{ transform: mostraHeyLucy ? "translateX(0)" : "translateX(100%)" }}
              />
              {[true, false].map((lato) => {
                const attivo = lato === mostraHeyLucy;
                return (
                  <button
                    key={String(lato)}
                    type="button"
                    aria-pressed={attivo}
                    onClick={() => setMostraHeyLucy(lato)}
                    className={cn(
                      "relative z-10 flex-1 rounded-pill px-2 py-2 text-xs font-bold leading-tight transition-colors duration-300",
                      attivo ? "text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {lato ? t("home.advantage.heylucy") : t("home.advantage.standard")}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 space-y-4">
              {rows.map((row, index) => (
                <Reveal key={row} delay={160 + index * 90}>
                  <p className="text-fluid-sm font-bold text-primary">
                    {t(`home.advantage.${row}.feature`)}
                  </p>
                  <div
                    className={cn(
                      "mt-2 rounded-lg p-3 transition-[background-color,border-color,box-shadow] duration-300",
                      mostraHeyLucy
                        ? "border border-transparent bg-primary shadow-card"
                        : "border border-primary/15 bg-transparent",
                    )}
                  >
                    {/* I due valori stanno incolonnati dentro una finestra alta
                        una riga: cambiando lato il nastro scorre di una riga.
                        ⚠️ Il testo di ciascuno sta nel suo `span`, altrimenti
                        il `gap` del flex si infila fra le parole. */}
                    <div className="h-6 overflow-hidden">
                      <div
                        className="transition-transform duration-500 ease-reveal motion-reduce:transition-none"
                        style={{ transform: mostraHeyLucy ? "translateY(0)" : "translateY(-1.5rem)" }}
                      >
                        <span className="flex h-6 items-center gap-2 text-xs font-bold text-accent">
                          <Check className="h-4 w-4 shrink-0 stroke-[3]" />
                          <span>
                            <AnimatedNumber text={t(`home.advantage.${row}.heylucy`)} active={isVisible} />
                          </span>
                        </span>
                        <span className="flex h-6 items-center gap-2 text-xs font-medium text-muted-foreground">
                          <X className="h-4 w-4 shrink-0 stroke-[3] text-muted-foreground/60" />
                          <span>
                            <AnimatedNumber text={t(`home.advantage.${row}.standard`)} active={isVisible} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageSection;
