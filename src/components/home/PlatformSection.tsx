import { Fragment } from "react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import searchImage from "@/assets/platform-search.webp";
import conciergeImage from "@/assets/platform-concierge.webp";
import preventionImage from "@/assets/platform-prevention.webp";
import discountsImage from "@/assets/platform-discounts.png";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * Distanza fra il bordo alto della cella e il centro della scheda.
 *
 * La cella del filo non ha margine, quindi e' alta quanto tutta la riga:
 * altezza della scheda piu' i 40px di `mb-10`. Il centro della scheda cade
 * quindi a meta' cella meno 20px, ed e' li' che vanno il pallino e lo stacco
 * fra i due segmenti di filo.
 *
 * ⚠️ Cambiando `mb-10` sulle celle va rifatta anche questa misura.
 */
const DOT_TOP = "calc(50% - 1.25rem)";

/**
 * Le righe hanno `repeat`: entrano scendendo e rientrano risalendo, invece di
 * restare visibili per sempre come nel resto del sito. E' l'unico punto in cui
 * il movimento e' a doppio senso, richiesto esplicitamente.
 *
 * Struttura presa dalla sezione «Un metodo strutturato» del riferimento:
 * schede a sinistra, immagini a destra, un filo verticale fra le due colonne
 * con un pallino per riga. Fondo bianco e piatto, niente fascia colorata.
 *
 * Due scostamenti obbligati dal riferimento, che la' ha cinque punti elenco
 * per scheda e fotografie a tutto campo:
 *  - il testo della scheda e' centrato in verticale. Le nostre schede hanno un
 *    paragrafo solo e l'altezza della riga la detta l'immagine: allineate in
 *    alto lasciavano sotto un vuoto grigio di duecento pixel
 *  - il riquadro dell'immagine e' 16/10 e non 4/3, sempre per accorciare la
 *    riga, e le schermate stanno in `object-contain`
 */
const PlatformSection = () => {
  const { t } = useTranslation();

  const features = [
    { key: "card1", image: searchImage },
    { key: "card2", image: conciergeImage },
    { key: "card3", image: preventionImage },
    { key: "card4", image: discountsImage },
  ];

  return (
    <section className="bg-background py-16 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading align="left" rule={false} className="max-w-[820px]">
            {t("home.platform.title")}
          </SectionHeading>
        </Reveal>

        {/* La colonna di mezzo e' larga quanto lo stacco fra le due: il filo ci
            corre dentro. `-mb-10` riassorbe il margine dell'ultima riga. */}
        <div className="-mb-7 mt-10 grid md:-mb-10 md:mt-16 lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)]">
          {features.map(({ key, image }, index) => (
            <Fragment key={key}>
              <Reveal repeat className="mb-7 md:mb-10">
                {/* Solo testo: niente scheda grigia sotto e niente pastiglia
                    attorno al numero. Il numero resta come indice, in
                    `muted-foreground` per non competere con il titolo. */}
                <article className="flex h-full flex-col justify-center py-2 lg:pr-8">
                  <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-fluid-lg font-bold leading-tight text-primary">
                    {t(`home.platform.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-fluid-sm leading-relaxed text-muted-foreground">
                    {t(`home.platform.${key}.description`)}
                  </p>
                </article>
              </Reveal>

              {/* Filo e pallino. Due segmenti invece di uno: quello sopra manca
                  alla prima riga e quello sotto all'ultima, cosi' il filo
                  comincia e finisce sui pallini come nel riferimento. */}
              <div aria-hidden="true" className="relative hidden lg:block">
                {index > 0 && (
                  <span
                    className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-primary/20"
                    style={{ height: DOT_TOP }}
                  />
                )}
                {/* Il pallino entra e rientra con la riga. La posizione sta
                    sul contenitore e l'animazione dentro: `Reveal`, da visibile,
                    impone `translate-x-0 translate-y-0` e cancellerebbe il
                    centraggio se le due cose stessero sullo stesso elemento. */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: DOT_TOP }}
                >
                  <Reveal as="span" direction="scale" repeat duration={500}>
                    <span className="block h-3 w-3 rounded-full bg-primary" />
                  </Reveal>
                </span>
                {index < features.length - 1 && (
                  <span
                    className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-primary/20"
                    style={{ top: DOT_TOP }}
                  />
                )}
              </div>

              <Reveal repeat delay={140} className="mb-7 md:mb-10">
                {/* `object-contain` e non `cover`: sono schermate di prodotto
                    con proporzioni diverse, ritagliandole si perdono titoli e
                    pulsanti. Il riferimento ha fotografie e puo' permetterselo. */}
                <div className="aspect-[16/10] h-full overflow-hidden rounded-card border border-card-border/10 bg-accent">
                  <img
                    src={image}
                    alt={t(`home.platform.${key}.imageAlt`)}
                    loading="lazy"
                    className="h-full w-full object-contain p-2 md:p-6"
                  />
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
