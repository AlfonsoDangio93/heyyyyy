import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/Reveal";
import FAQSection from "@/components/home/FAQSection";
import ClientsSection from "@/components/home/ClientsSection";
import teamImage from "@/assets/chi-siamo-team.jpg";
import { useTranslation } from "@/i18n/useTranslation";

const LinkedName = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
  >
    {children}
  </a>
);

/**
 * «Chi siamo» nel linguaggio nuovo: la foto vera del team a tutto campo, il
 * racconto su pagina bianca, poi le FAQ e la chiusura condivisa.
 *
 * ⚠️ **Velo crema leggero, non petrolio pesante.** Sono passate tre versioni:
 * sfumatura dal basso (il menu sul cielo chiaro non si leggeva), velo petrolio
 * all'80% (necessario per reggere il crema del menu, ma spegneva la foto), e
 * infine questa. Qui il velo non deve reggere niente:
 *  - il menu e' fuori discussione, perche' questa pagina **non e' in
 *    `OVERLAY_ROUTES`**: l'header resta pieno e il logo si vede sempre
 *  - il testo sta in una scatola crema piena, petrolio su crema fa 6,25:1
 * Quindi il velo torna a fare solo il suo mestiere: portare la fotografia
 * dentro la palette, senza cancellarla.
 *
 * ⚠️ Per reggere il testo direttamente sulla foto servirebbe un velo crema
 * all'85%: misurato, sotto quella soglia il 5% piu' scuro resta a 3,9:1.
 */
const ChiSiamo = () => {
  const { t, language } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO — la foto del team */}
        <section className="relative isolate flex min-h-[560px] items-end lg:min-h-[680px]">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={teamImage}
              alt={t("chiSiamo.imageAlt")}
              loading="eager"
              className="h-full w-full object-cover object-center"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-accent/45" />
          </div>

          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <Reveal threshold={0} duration={900} className="max-w-2xl">
              <div className="rounded-card bg-accent p-7 shadow-soft md:p-10">
                <h1 className="font-display text-fluid-4xl font-normal tracking-tight text-primary">
                  {t("chiSiamo.title")}
                </h1>
                <p className="mt-5 text-fluid-base leading-relaxed text-muted-foreground">
                  {language === "it" ? (
                    <>
                      Siamo una realtà nata nel 2025 dallo startup studio{" "}
                      <LinkedName href="https://mamazen.it/">Mamazen</LinkedName> insieme a{" "}
                      <LinkedName href="https://www.linkedin.com/in/francesco-chiarpenello-0b22a5182/">
                        Francesco Chiarpenello
                      </LinkedName>{" "}
                      e{" "}
                      <LinkedName href="https://www.linkedin.com/in/andrea-zanovello/">
                        Andrea Zanovello
                      </LinkedName>
                      .
                    </>
                  ) : (
                    <>
                      We are a company born in 2025 from the{" "}
                      <LinkedName href="https://mamazen.it/">Mamazen</LinkedName> startup studio
                      together with{" "}
                      <LinkedName href="https://www.linkedin.com/in/francesco-chiarpenello-0b22a5182/">
                        Francesco Chiarpenello
                      </LinkedName>{" "}
                      and{" "}
                      <LinkedName href="https://www.linkedin.com/in/andrea-zanovello/">
                        Andrea Zanovello
                      </LinkedName>
                      .
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RACCONTO */}
        <section className="bg-background py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-[680px] space-y-6">
              <Reveal>
                <p className="text-fluid-base leading-relaxed text-muted-foreground">
                  {t("chiSiamo.paragraph2")}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-fluid-base leading-relaxed text-muted-foreground">
                  {t("chiSiamo.paragraph3")}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* ⚠️ Respiro bianco prima del pannello clienti: quello si centra sul
            confine con il footer, e senza questo spazio finirebbe a cavallo del
            bordo della scatola delle FAQ invece che del footer. */}
        <div aria-hidden="true" className="h-16 bg-background md:h-20" />

        <ClientsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ChiSiamo;
