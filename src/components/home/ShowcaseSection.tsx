import Reveal from "@/components/Reveal";
import bandImage from "@/assets/Heylucy_-_Prevenzione_in_azienda.jpg";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * Fascia fotografica a tutta larghezza, ricalcata sul riferimento: circa
 * 400px, immagine luminosa con una affermazione breve sopra.
 *
 * Il velo e' leggero e parte da sinistra, come nella hero: serve solo a
 * garantire il contrasto del bianco, non a scurire la fotografia.
 *
 * Erano tre. Le prime due, «Trasmette attenzione reale alle persone» e
 * «Favorisce un clima sano e collaborativo», sono state tolte su richiesta.
 * Le chiavi restano in `it.json` perche' le usa anche `WhyWelfareSection` su
 * `/giornate-di-prevenzione`, dove sono un elenco e non una fascia.
 */
const BANDS = [{ image: bandImage, key: "whyWelfare.benefit3" }];

const ShowcaseSection = () => {
  const { t } = useTranslation();

  return (
    <section aria-label={t("home.showcase.label")}>
      {BANDS.map(({ image, key }, index) => (
        <div key={key} className="relative isolate flex min-h-[320px] items-center md:min-h-[400px]">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-primary/55 via-primary/35 via-50% to-primary/20"
            />
          </div>

          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <Reveal delay={index * 60} className="max-w-2xl lg:max-w-[57%]">
              <p className="font-display text-fluid-2xl font-normal tracking-tight text-white">
                {t(key)}
              </p>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShowcaseSection;
