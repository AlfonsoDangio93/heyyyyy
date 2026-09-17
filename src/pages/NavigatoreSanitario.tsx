import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/home/SectionHeading";
import ClientsSection from "@/components/home/ClientsSection";
import PlatformDetailSection from "@/components/navigatore/PlatformDetailSection";
import heroImage from "@/assets/hero-come-funziona.webp";
import valueImage from "@/assets/valore-welfare.webp";
import timeImage from "@/assets/tempo-liberato.webp";
import doctorsImage from "@/assets/problem-screening.jpg";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";

const VALUE_KEYS = ["item1", "item2", "item3"];

/**
 * Le tre voci: la seconda occupa la colonna alta, come nel riferimento.
 *
 * Le fotografie sono scelte sul senso della frase, non a caso: la ragazza con
 * il raccoglitore per il valore percepito dal team, la ragazza che si stira al
 * sole per il tempo che il dipendente si riprende, i medici per la cultura
 * della prevenzione. Le prime due sono le foto nuove del cliente, la terza e'
 * una che il progetto aveva gia'.
 *
 * ⚠️ `problem-fondi-sanitari.jpg` (la pila di moduli) e' uscita di qui: stava
 * sulla scheda 02 e il cliente ci ha voluto la foto nuova.
 *
 * ⚠️ `alt=""`: la frase della scheda dice gia' tutto, una descrizione della
 * foto aggiungerebbe rumore a chi legge con uno screen reader.
 */
const VALUE_CARDS = [
  // ⚠️ `focus` e' il ritaglio, ed e' misurato scheda per scheda: le due
  // fotografie nuove stanno in una striscia molto larga (640×144), dove un
  // ritaglio centrato mostra solo la fascia centrale dell'originale.
  // Sul ritratto in studio quella fascia e' il raccoglitore, non la faccia,
  // che nell'originale sta fra l'8% e il 42% dell'altezza: da li' il 12%.
  { key: "item1", image: valueImage, focus: "object-[50%_12%]" },
  { key: "item3", image: doctorsImage, focus: "object-center" },
  { key: "item2", image: timeImage, focus: "object-center" },
];

/**
 * «Come funziona», rifatta nel linguaggio della home: fotografia a tutto campo
 * nell'hero, pannello che scavalca il bordo, sezioni chiare con il titolo a
 * sinistra e scatole stondate per i momenti forti.
 *
 * Niente pannello testate a scavalcare il bordo: in home c'e', qui e' stato
 * tolto su richiesta.
 *
 * ⚠️ **Il testo dell'hero sta dentro una scatola petrolio, non sopra la foto.**
 * La fotografia ha le sedie bianche a tutta altezza: misurato, il bianco sopra
 * fa 2,4:1, e per portarlo a 4,5 servirebbe un velo all'88% che cancella la
 * fotografia. La scatola risolve il contrasto (crema su petrolio, 6,25:1) e
 * lascia la foto visibile intorno.
 *
 * La scatola sta **a destra** da `md` in su: nella fotografia nuova il
 * soggetto e' a sinistra.
 */
const NavigatoreSanitario = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative isolate z-10">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              // ⚠️ Il ritaglio e' misurato sulla fotografia nuova, che ha il
              // soggetto fra il 22% e il 42% della larghezza e la testa fra il
              // 10% e il 25% dell'altezza.
              // `object-top`: da `md` la fascia visibile e' l'80% centrale e un
              // ritaglio centrato mangerebbe la testa. Ancorando in alto si
              // perde solo il pavimento.
              // `object-[22%_top]` sotto `md`: li' la fascia visibile e' il 36%
              // della larghezza e un ritaglio centrato mostrerebbe solo le
              // sedie vuote.
              className="h-full w-full object-cover object-[22%_top] md:object-top"
            />
            {/* Velo leggero: qui serve solo a portare la foto dentro la palette,
                non a reggere il testo, che ha la sua scatola. */}
            <div aria-hidden="true" className="absolute inset-0 bg-primary/35" />
          </div>

          {/* ⚠️ `pt-52` sotto `md`: li' la scatola prende quasi tutta la
              larghezza e con lo stacco di prima finiva sulla faccia del
              soggetto, che nel ritaglio verticale sta fra 77 e 192 pixel.
              Con 208 di stacco la faccia resta sopra la scatola. */}
          <div className="container mx-auto px-4 pb-28 pt-52 sm:px-6 md:pt-40 lg:px-8 lg:pb-32 lg:pt-48">
            {/* La scatola sta a destra: la fotografia ha il soggetto a
                sinistra e coprirlo con il testo sarebbe stato uno spreco. */}
            <Reveal threshold={0} duration={900} data-header-overlap className="max-w-xl md:ml-auto lg:max-w-[56%]">
              <div className="rounded-card bg-primary p-7 shadow-soft md:p-12">
                <h1 className="font-display text-fluid-4xl font-normal tracking-tight text-accent">
                  {t("navigatore.hero.title")}
                </h1>
                <p className="mt-6 text-fluid-base leading-relaxed text-accent/85">
                  {t("navigatore.hero.subtitle")}
                </p>
                <div className="mt-8">
                  <CtaButton tone="light">{t("navigatore.hero.cta")}</CtaButton>
                </div>
              </div>
            </Reveal>
          </div>

        </section>

        <PlatformDetailSection />

        {/* VALORE — scatola scura con le schede, come nel riferimento */}
        <section className="bg-background px-3 py-3 md:p-4">
          <div className="rounded-card bg-primary py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading tone="light" align="left" rule={false} className="max-w-[820px]">
                  {t("navigatore.value.title")}
                </SectionHeading>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-6 max-w-[640px] text-fluid-base leading-relaxed text-accent/80">
                  {t("navigatore.value.subtitle")}
                </p>
              </Reveal>

              {/* Griglia asimmetrica: due schede in colonna a sinistra e una
                  alta a destra. La terza cresce fino all'altezza delle altre
                  due grazie a `lg:h-full` sulla cella. */}
              <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2">
                <div className="grid gap-5">
                  {VALUE_CARDS.slice(0, 2).map(({ key, image, focus }, index) => (
                    <Reveal key={key} delay={220 + index * 120}>
                      <article className="flex h-full flex-col overflow-hidden rounded-card border border-accent/10 bg-accent/[0.07] p-6 md:p-8">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent/90">
                          {String(VALUE_KEYS.indexOf(key) + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-4 text-fluid-lg font-bold leading-snug text-accent">
                          {t(`navigatore.value.${key}`)}
                        </p>
                        <div className="relative mt-6 h-32 overflow-hidden rounded-lg md:h-36">
                          <img
                            src={image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className={cn("h-full w-full object-cover", focus)}
                          />
                          {/* Velo leggero: lega la fotografia al fondo petrolio
                              della scatola senza spegnerla. */}
                          <span aria-hidden="true" className="absolute inset-0 bg-primary/15" />
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={460} className="lg:h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-card border border-accent/10 bg-accent/[0.07] p-6 md:p-8">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent/90">
                      {String(VALUE_KEYS.indexOf(VALUE_CARDS[2].key) + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 text-fluid-xl font-bold leading-snug text-accent">
                      {t(`navigatore.value.${VALUE_CARDS[2].key}`)}
                    </p>
                    <div className="relative mt-6 min-h-[240px] flex-1 overflow-hidden rounded-lg">
                      <img
                        src={VALUE_CARDS[2].image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className={cn("h-full w-full object-cover", VALUE_CARDS[2].focus)}
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-primary/15" />
                    </div>
                  </article>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* CHIUSURA */}
        <section className="bg-background py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <Reveal>
                <SectionHeading rule={false}>{t("navigatore.cta.title")}</SectionHeading>
              </Reveal>
              <Reveal delay={130}>
                <p className="text-fluid-base leading-relaxed text-muted-foreground">
                  {t("navigatore.cta.subtitle")}
                </p>
              </Reveal>
              <Reveal direction="scale" delay={260} className="pt-2">
                <CtaButton>{t("navigatore.cta.cta")}</CtaButton>
              </Reveal>
            </div>
          </div>
        </section>

        <ClientsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NavigatoreSanitario;
