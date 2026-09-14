import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import PressPanel from "@/components/home/PressPanel";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-aziende.jpg";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * Struttura misurata sui pixel dell'hero di riferimento (viewport 1913 CSS):
 *  - fotografia a tutto campo, nessuna colonna: il testo ci sta sopra
 *  - testo tutto nella meta' sinistra, dal 10% al 53% della larghezza
 *  - titolo a 282px dal bordo alto, colonna alta 411px, 108px fino al fondo
 *  - cinque elementi in colonna: titolo, sottotitolo, tre punti, due CTA
 *  - in fondo un pannello che scavalca il bordo inferiore per meta' altezza,
 *    allineato a destra. Il riferimento lo tiene al 56% della finestra, qui e'
 *    piu' largo (67%): i nostri sono cinque nomi per esteso, non quattro loghi.
 *    Sotto `xl` prende tutta la larghezza del contenitore
 *
 * Il sottotitolo e' `fluid-base` in semibold, non `fluid-lg`: nel riferimento
 * misura 18px ed e' quasi della stessa taglia dei punti elenco, la gerarchia
 * la fa il peso e non il corpo.
 */
const HeroSection = () => {
  const { t } = useTranslation();

  const bullets = [t("hero.bullet1"), t("hero.bullet2"), t("hero.bullet3")];

  return (
    <section className="relative isolate z-10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        {/* Il riferimento ha una foto di luminanza media appena smorzata, con
            il bianco sopra a 5.4:1. La nostra foto e' un muro chiaro (media
            166), quindi per arrivare allo stesso risultato percepito il velo
            deve essere piu' denso: misurato sul render, questo gradiente da'
            5.2:1 mediano e 4.6:1 come minimo sulle righe di testo. Un velo
            leggero come quello del riferimento qui darebbe 2.4:1. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 via-55% to-primary/45"
        />
      </div>

      <div className="container mx-auto px-4 pb-28 pt-36 sm:px-6 md:pt-48 lg:px-8 lg:pb-28 lg:pt-72">
        {/* `data-header-overlap`: da qui in giu' l'header trasparente passerebbe
            sopra a del testo bianco. `Header` ci misura la soglia oltre cui
            tornare opaco. */}
        <div data-header-overlap className="max-w-xl space-y-8 lg:max-w-[52%]">
          <Reveal threshold={0} duration={900}>
            <h1 className="font-display text-fluid-4xl font-normal tracking-tight text-white">
              {t("hero.title")}
            </h1>
          </Reveal>

          <Reveal threshold={0} delay={140} duration={900}>
            <p className="text-fluid-base font-semibold text-white">{t("hero.subtitle")}</p>
          </Reveal>

          <Reveal threshold={0} delay={260} duration={900}>
            {/* Il punto sta fuori dal testo, a filo del margine sinistro, come
                nel riferimento: `list-disc` lo rientrerebbe insieme alla riga. */}
            <ul className="space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-fluid-base text-white/90">
                  <span aria-hidden="true">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="scale" threshold={0} delay={380} duration={900}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CtaButton tone="light">{t("hero.cta")}</CtaButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-pill border-white/70 bg-transparent px-8 text-fluid-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/navigatore-sanitario">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Cerniera con la sezione chiara che segue: il pannello sporge per meta'
          della propria altezza. `overflow-hidden` sta sul wrapper della foto e
          non sulla sezione, altrimenti taglierebbe proprio la sporgenza. */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal threshold={0} delay={500} duration={900} className="xl:ml-auto xl:w-[84%]">
            {/* Padding piu' generoso del default: il pannello del riferimento
                e' alto 86px e la sporgenza vale meta' di quell'altezza. */}
            <PressPanel className="md:px-10 md:py-7" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
