import { Check } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import searchImage from "@/assets/platform-search.webp";
import conciergeImage from "@/assets/platform-concierge.webp";
import preventionImage from "@/assets/platform-prevention.webp";
import discountsImage from "@/assets/platform-discounts.png";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * `dark` alterna il fondo della scheda fra petrolio e azzurro pallino, riga
 * dopo riga. E' quello a dare il ritmo: quattro righe uguali, per quanto ben
 * fatte, si leggono come un elenco.
 */
const FEATURES = [
  { key: "card1", image: searchImage, dark: true },
  { key: "card2", image: conciergeImage, dark: false },
  { key: "card3", image: preventionImage, dark: true },
  { key: "card4", image: discountsImage, dark: false },
];

const POINTS = ["point1", "point2", "point3"];

/**
 * Versione estesa del blocco piattaforma, per la pagina «Come funziona».
 *
 * Impaginazione a zigzag: la scheda e l'immagine si scambiano di lato a ogni
 * riga e si **sovrappongono** di una colonna, come in un'apertura di rivista.
 * Dietro al titolo della scheda c'e' il numero in gigante, appena accennato.
 *
 * E' il punto in cui la pagina osa di piu', ed e' voluto: la home mostra la
 * vetrina breve, qui c'e' il racconto lungo e serve qualcosa che tenga la
 * lettura. Le righe entrano e rientrano con lo scroll (`repeat`), da destra o
 * da sinistra secondo il lato.
 *
 * ⚠️ **L'immagine sta sopra e la scheda sotto.** Sono schermate di prodotto: se
 * fosse la scheda a coprirle si perderebbero pezzi di interfaccia. La scheda e'
 * un blocco di colore e puo' finire coperta, percio' ha il padding maggiorato
 * dal lato della sovrapposizione.
 */
const PlatformDetailSection = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading align="left" rule={false} className="max-w-[820px]">
            {t("navigatore.platform.title")}
          </SectionHeading>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-[640px] text-fluid-base leading-relaxed text-muted-foreground">
            {t("navigatore.platform.subtitle")}
          </p>
        </Reveal>

        <div className="mt-16 space-y-14 md:mt-20 md:space-y-20">
          {FEATURES.map(({ key, image, dark }, index) => {
            const flip = index % 2 === 1;

            return (
              <div key={key} className="grid items-center gap-6 lg:grid-cols-12 lg:gap-0">
                <Reveal
                  repeat
                  direction={flip ? "left" : "right"}
                  duration={800}
                  className={cn(
                    "lg:col-span-7 lg:row-start-1",
                    flip ? "lg:col-start-6" : "lg:col-start-1",
                  )}
                >
                  <article
                    className={cn(
                      "relative h-full overflow-hidden rounded-card p-7 md:p-10",
                      // Il padding cresce dal lato dove passa l'immagine.
                      flip ? "lg:pl-[16%]" : "lg:pr-[16%]",
                      dark ? "bg-primary" : "bg-secondary-pale",
                    )}
                  >
                    {/* Numero in gigante, appena accennato.
                        ⚠️ Sta sempre dal lato **libero**, cioe' opposto a quello
                        dove passa l'immagine: messo dal lato della
                        sovrapposizione finiva coperto e spariva. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute -top-6 font-display text-[7rem] leading-none md:text-[9rem]",
                        flip ? "right-4" : "left-4",
                        dark ? "text-accent/15" : "text-primary/10",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      <h3
                        className={cn(
                          "text-fluid-xl font-bold leading-tight",
                          dark ? "text-accent" : "text-primary",
                        )}
                      >
                        {t(`navigatore.platform.${key}.title`)}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 text-fluid-base font-semibold leading-snug",
                          dark ? "text-accent" : "text-primary",
                        )}
                      >
                        {t(`navigatore.platform.${key}.lead`)}
                      </p>
                      <p
                        className={cn(
                          "mt-3 text-fluid-sm leading-relaxed",
                          dark ? "text-accent/80" : "text-muted-foreground",
                        )}
                      >
                        {t(`navigatore.platform.${key}.body`)}
                      </p>

                      <ul
                        className={cn(
                          "mt-6 space-y-2.5 border-t pt-5",
                          dark ? "border-accent/20" : "border-card-border/15",
                        )}
                      >
                        {POINTS.map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <Check
                              className={cn(
                                "mt-0.5 h-4 w-4 shrink-0 stroke-[3]",
                                dark ? "text-accent" : "text-success",
                              )}
                            />
                            <span
                              className={cn(
                                "text-fluid-sm leading-relaxed",
                                dark ? "text-accent/90" : "text-primary",
                              )}
                            >
                              {t(`navigatore.platform.${key}.${point}`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>

                <Reveal
                  repeat
                  direction={flip ? "right" : "left"}
                  delay={120}
                  duration={800}
                  className={cn(
                    "lg:z-10 lg:col-span-6 lg:row-start-1",
                    flip ? "lg:col-start-1" : "lg:col-start-7",
                  )}
                >
                  <div className="overflow-hidden rounded-card border border-card-border/10 bg-background shadow-soft">
                    <img
                      src={image}
                      alt={t(`home.platform.${key}.imageAlt`)}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-contain p-3 md:p-5"
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformDetailSection;
