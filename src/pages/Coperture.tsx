import { FileSearch, Layers, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import ClientsSection from "@/components/home/ClientsSection";
import copertureImage from "@/assets/problem-fondi-sanitari.jpg";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * ⚠️ Le CTA di questa pagina sono piu' strette di quelle di serie: l'etichetta
 * «PRENOTA UN ASSESSMENT GRATUITO» e' lunga trenta caratteri e alla misura
 * normale la pastiglia diventava 412x44, cioe' lunga nove volte la sua altezza.
 * Corpo a 16px, padding a 24 e altezza a 48 la riportano a proporzioni da
 * bottone.
 */
const ITEMS = [
  { key: "item1", icon: FileSearch },
  { key: "item2", icon: Layers },
  { key: "item3", icon: Users },
];

/**
 * ⚠️ **Il testo dell'hero sta in una scatola, non sulla foto.** La fotografia
 * dei moduli e' luminosa, sono fogli bianchi: misurato, anche con un velo al
 * 75% il crema sopra ci fa 3,6:1 nel 5% peggiore. E per lo stesso motivo
 * questa pagina **non e' in `OVERLAY_ROUTES`**: l'header trasparente sopra
 * quella fascia arriverebbe a 3,7:1. Header pieno e velo leggero, che serve
 * solo a portare la foto dentro la palette.
 */
const CopertureHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[520px] items-center lg:min-h-[620px]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={copertureImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-primary/45" />
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal threshold={0} duration={900} className="max-w-xl lg:max-w-[56%]">
          <div className="rounded-card bg-primary p-7 shadow-soft md:p-12">
            <h1 className="font-display text-fluid-4xl font-normal tracking-tight text-accent">
              {t("coperture.hero.title")}
            </h1>
            <p className="mt-6 text-fluid-base leading-relaxed text-accent/85">
              {t("coperture.hero.subtitle")}
            </p>
            {/* ⚠️ Nell'hero **non** c'e' la prenotazione: e' un impegno grosso
                da chiedere alla prima schermata. Qui l'invito e' morbido e
                porta al blocco sotto; la prenotazione sta in fondo, dopo che
                si e' capito di cosa si parla. */}
            <div className="mt-8">
              <a
                href="#assessment"
                className="inline-flex h-12 items-center justify-center rounded-pill border border-accent/70 px-6 text-fluid-sm font-semibold text-accent transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
              >
                {t("coperture.hero.cta")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/** Scatola azzurra con le tre schede bianche: cosa guardiamo nell'assessment. */
const CopertureAssessment = () => {
  const { t } = useTranslation();

  return (
    <section id="assessment" className="scroll-mt-24 bg-background px-3 py-3 md:p-4">
      <div className="rounded-card bg-secondary-pale py-14 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading align="left" rule={false} className="max-w-[820px]">
              {t("coperture.section1.title")}
            </SectionHeading>
          </Reveal>

          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
            {ITEMS.map(({ key, icon: Icon }, index) => (
              <Reveal key={key} delay={160 + index * 120} className="h-full">
                <article className="flex h-full flex-col rounded-card bg-background p-6 shadow-card md:p-8">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="mt-5 text-fluid-lg font-bold leading-tight text-primary">
                    {t(`coperture.section1.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-fluid-sm leading-relaxed text-muted-foreground">
                    {t(`coperture.section1.${key}.subtitle`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Scatola petrolio: l'esito dell'assessment e la chiamata all'azione.
 *
 * ⚠️ Ha un fondo piu' alto degli altri box (`pb-16`): il pannello clienti si
 * centra sul confine con il footer, e senza quello spazio bianco finirebbe a
 * cavallo del bordo della scatola petrolio invece che del footer.
 */
const CopertureOutcome = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background px-3 pb-16 pt-3 md:px-4 md:pb-20 md:pt-4">
      <div className="rounded-card bg-primary py-14 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[820px]">
            <Reveal>
              <span className="inline-block rounded-pill border border-accent/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent/90">
                {t("coperture.section2.kicker")}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading tone="light" align="left" rule={false} className="mt-6">
                {t("coperture.section2.title")}
              </SectionHeading>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-[640px] text-fluid-base leading-relaxed text-accent/80">
                {t("coperture.section2.text")}
              </p>
            </Reveal>
            <Reveal direction="scale" delay={360} className="mt-8">
              <CtaButton tone="light" className="h-12 px-6 text-fluid-sm">{t("coperture.cta")}</CtaButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Coperture = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <CopertureHero />
      <CopertureAssessment />
      <CopertureOutcome />
      <ClientsSection />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default Coperture;
