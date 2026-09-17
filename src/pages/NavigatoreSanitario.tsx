import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/home/SectionHeading";
import ClientsSection from "@/components/home/ClientsSection";
import PlatformDetailSection from "@/components/navigatore/PlatformDetailSection";
import heroImage from "@/assets/hero-come-funziona.webp";
import { useTranslation } from "@/i18n/useTranslation";

const VALUE_KEYS = ["item1", "item2", "item3"];

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
 * La scatola sta **a sinistra** e la fotografia e' specchiata, cosi' il
 * soggetto resta a destra.
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
              // ⚠️ Il ritaglio e' misurato: nella fotografia allargata e
              // **specchiata** l'uomo sta al 78% della larghezza e la sua testa
              // fra il 6% e il 21% dell'altezza.
              // `top`: la fascia visibile non prende tutta l'altezza e un
              // ritaglio centrato mangerebbe la testa. Ancorando in alto si
              // perde solo il pavimento.
              // `78%` sull'asse x a tutte le larghezze: cosi' l'uomo cade a
              // meta' dello spazio libero fra la scatola del testo e il bordo
              // destro. Con il ritaglio centrato, a 768 finirebbe fuori dallo
              // schermo.
              className="h-full w-full object-cover object-[78%_top]"
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
            {/* La scatola sta a sinistra e la fotografia e' specchiata, cosi'
                l'uomo resta a destra: e' l'impaginazione del resto del sito,
                testo a sinistra e immagine a destra. */}
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

              {/* Tre affermazioni, **senza fotografie**.
                  ⚠️ Prima c'erano: due schede con una striscia alta 144px e
                  una scheda alta con la foto in verticale. Tolte su richiesta,
                  perche' in una striscia cosi' bassa ogni fotografia usciva
                  schiacciata e non aggiungeva niente. Non rimetterle.
                  Il numero grande in `font-display` regge la scheda al posto
                  dell'immagine, con il filetto corto a fare da stacco. */}
              <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
                {VALUE_KEYS.map((key, index) => (
                  <Reveal key={key} delay={220 + index * 120}>
                    <article className="flex h-full flex-col rounded-card border border-accent/10 bg-accent/[0.07] p-7 md:p-9">
                      <span className="font-display text-fluid-3xl leading-none text-accent/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="mt-6 block h-px w-12 bg-accent/30" />
                      <p className="mt-6 text-fluid-lg font-bold leading-snug text-accent">
                        {t(`navigatore.value.${key}`)}
                      </p>
                    </article>
                  </Reveal>
                ))}
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
