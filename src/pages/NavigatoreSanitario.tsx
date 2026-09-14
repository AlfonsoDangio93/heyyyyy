import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/home/SectionHeading";
import ClientsSection from "@/components/home/ClientsSection";
import PlatformDetailSection from "@/components/navigatore/PlatformDetailSection";
import heroImage from "@/assets/hero-navigatore.jpg";
import teamImage from "@/assets/hero-aziende.jpg";
import paperworkImage from "@/assets/problem-fondi-sanitari.jpg";
import doctorsImage from "@/assets/problem-screening.jpg";
import { useTranslation } from "@/i18n/useTranslation";

const VALUE_KEYS = ["item1", "item2", "item3"];

/**
 * Le tre voci: la seconda occupa la colonna alta, come nel riferimento.
 *
 * Le fotografie sono scelte sul senso della frase, non a caso: il gruppo che
 * festeggia per il valore percepito dal team, la pila di moduli per il tempo
 * perso in pratiche, i medici per la cultura della prevenzione. Sono foto che
 * il progetto ha gia'; `problem-assicurazioni.jpg` e' rimasta fuori perche'
 * racconta la stessa cosa della pila di moduli.
 *
 * ⚠️ `alt=""`: la frase della scheda dice gia' tutto, una descrizione della
 * foto aggiungerebbe rumore a chi legge con uno screen reader.
 */
const VALUE_CARDS = [
  { key: "item1", image: teamImage },
  { key: "item3", image: doctorsImage },
  { key: "item2", image: paperworkImage },
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
 * La fotografia della sala d'attesa ha le sedie bianche proprio nella colonna
 * del testo: misurato, il bianco sopra ci fa 2,4:1, e per portarlo a 4,5
 * servirebbe un velo all'88% che cancella la fotografia. La scatola risolve il
 * contrasto (crema su petrolio, 6,25:1) e lascia la foto visibile intorno.
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
              // ⚠️ Due correzioni al ritaglio, entrambe misurate.
              // `object-top`: la sorgente e' 1536x1024 e un ritaglio centrato
              // toglie 263px sopra, cioe' esattamente la testa del soggetto.
              // `scale-x-[-1]`: nell'originale il soggetto sta al 31% della
              // larghezza, cioe' dietro alla scatola del testo, che arriva al
              // 56%. Specchiata, lui finisce al 69% e si vede tutto.
              className="h-full w-full scale-x-[-1] object-cover object-top"
            />
            {/* Velo leggero: qui serve solo a portare la foto dentro la palette,
                non a reggere il testo, che ha la sua scatola. */}
            <div aria-hidden="true" className="absolute inset-0 bg-primary/35" />
          </div>

          <div className="container mx-auto px-4 pb-28 pt-32 sm:px-6 md:pt-40 lg:px-8 lg:pb-32 lg:pt-48">
            <Reveal threshold={0} duration={900} data-header-overlap className="max-w-xl lg:max-w-[56%]">
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
                  {VALUE_CARDS.slice(0, 2).map(({ key, image }, index) => (
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
                            className="h-full w-full object-cover"
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
                        className="h-full w-full object-cover"
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
