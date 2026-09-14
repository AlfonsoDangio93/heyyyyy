import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * Primo blocco dopo l'hero, misurato sullo screenshot di riferimento
 * (finestra 1910 CSS):
 *  - fondo chiaro e piatto, nessuna fascia, nessun bordo, nessuna card
 *  - titolo a sinistra su due righe, 52px, colonna larga 740px
 *  - paragrafo a sinistra, colonna larga 633px, interlinea larga
 *  - 102px dal bordo alto della sezione al titolo, 95px dal paragrafo al
 *    fondo: lo stacco sotto e' piu' corto di quello sopra
 *
 * Il padding e' un po' piu' alto dei 102px del riferimento perche' il
 * pannello delle testate sporge 42px dentro questa sezione: quello che deve
 * restare costante e' lo stacco fra il pannello e il titolo.
 *
 * ⚠️ Fondo bianco e non crema: la sezione successiva e' crema e due fondi
 * identici di fila non si distinguono.
 */
const StatementSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background pb-16 pt-20 md:pb-28 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading align="left" rule={false} className="max-w-[760px]">
            {t("home.statement.title")}
          </SectionHeading>
          <p className="mt-7 max-w-[640px] text-fluid-base leading-relaxed text-muted-foreground">
            {t("home.statement.text")}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default StatementSection;
