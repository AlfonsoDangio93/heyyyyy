import { useEffect, useState } from "react";
import { CalendarCheck, Clock, Receipt, Stethoscope, Umbrella, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Checkbox } from "@/components/ui/checkbox";
import Reveal from "@/components/Reveal";
import whatsappButton from "@/assets/whatsapp-button.png";
import emailButton from "@/assets/email-button.png";
import { useTranslation } from "@/i18n/useTranslation";

const SERVICES = [
  { key: "service1", icon: Stethoscope },
  { key: "service2", icon: CalendarCheck },
  { key: "service3", icon: Receipt },
  { key: "service4", icon: Users },
  { key: "service5", icon: Umbrella },
];

const PRIVACY_URL = "https://drive.google.com/file/d/1UY2MDdzLm45zfsf3XYRiG1xqq7Bo1CbZ/view";
const TERMS_URL = "https://drive.google.com/file/d/1s6M-bZFeBM8av1hEHh57P8EYGxwgyi7l/view";

const SportelloSanitario = () => {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [healthDataAccepted, setHealthDataAccepted] = useState(false);
  const { t } = useTranslation();

  // Impedisci indicizzazione della pagina su Google
  useEffect(() => {
    const metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    metaRobots.content = "noindex, nofollow";
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  const canContact = privacyAccepted && healthDataAccepted;

  const contactCardClasses =
    "flex w-full items-center justify-center rounded-card border border-card-border/10 bg-background p-8 shadow-card transition-all duration-300 ease-out";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-secondary-pale py-12 md:py-16">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <Reveal threshold={0}>
              <h1 className="font-display text-fluid-3xl font-normal tracking-tight text-primary">{t("sportello.title")}</h1>
            </Reveal>
            <Reveal threshold={0} delay={120}>
              <p className="mx-auto mt-2 max-w-xl text-base text-muted-foreground md:text-lg">
                {t("sportello.subtitle")}
              </p>
            </Reveal>
            <Reveal threshold={0} delay={240}>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary md:text-base">
                  {t("sportello.hours")}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contenuto */}
        <section className="bg-accent py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Servizi */}
              <div className="lg:col-span-1">
                <Reveal>
                  <h2 className="mb-8 text-2xl font-bold text-primary">
                    {t("sportello.contactTitle")}
                  </h2>
                </Reveal>
                <div className="space-y-6">
                  {SERVICES.map(({ key, icon: Icon }, index) => (
                    <Reveal key={key} direction="left" delay={120 + index * 90}>
                      <div className="group flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-[background-color,color,transform] duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-semibold text-primary">
                            {t(`sportello.${key}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`sportello.${key}.description`)}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Contatti */}
              <div className="lg:col-span-2">
                <Reveal delay={120}>
                  <h2 className="mb-2 text-2xl font-bold text-primary">
                    {t("sportello.chooseContact")}
                  </h2>
                  <p className="mb-6 text-muted-foreground">{t("sportello.enableCheckboxes")}</p>
                </Reveal>

                <Reveal delay={220}>
                  <div className="mb-8 space-y-4 rounded-card border border-card-border/10 bg-background p-5 shadow-card">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacy"
                        checked={privacyAccepted}
                        onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                        className="mt-1"
                      />
                      <label htmlFor="privacy" className="cursor-pointer text-sm text-muted-foreground">
                        {t("sportello.privacyCheckbox")}{" "}
                        <a
                          href={PRIVACY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-2 hover:no-underline"
                        >
                          {t("sportello.privacyPolicy")}
                        </a>{" "}
                        {t("sportello.and")}{" "}
                        <a
                          href={TERMS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-2 hover:no-underline"
                        >
                          {t("sportello.serviceConditions")}
                        </a>
                        .
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="health-data"
                        checked={healthDataAccepted}
                        onCheckedChange={(checked) => setHealthDataAccepted(checked === true)}
                        className="mt-1"
                      />
                      <label
                        htmlFor="health-data"
                        className="cursor-pointer text-sm text-muted-foreground"
                      >
                        {t("sportello.healthDataCheckbox")}
                      </label>
                    </div>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Reveal delay={320} className="flex flex-col items-center">
                    {canContact ? (
                      <button
                        onClick={() =>
                          window.open("https://api.whatsapp.com/send?phone=393715620380", "_blank")
                        }
                        className={`${contactCardClasses} cursor-pointer hover:-translate-y-1.5 hover:shadow-soft`}
                      >
                        <img
                          src={whatsappButton}
                          alt={t("sportello.whatsappAlt")}
                          className="max-h-40 object-contain"
                        />
                      </button>
                    ) : (
                      <div className={`${contactCardClasses} cursor-not-allowed opacity-50`}>
                        <img
                          src={whatsappButton}
                          alt={t("sportello.whatsappAlt")}
                          className="max-h-40 object-contain"
                        />
                      </div>
                    )}
                    {canContact && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {t("sportello.whatsappText")}
                      </p>
                    )}
                  </Reveal>

                  <Reveal delay={420} className="flex flex-col items-center">
                    {canContact ? (
                      <a
                        href="mailto:sportellosanitario@heylucy.it"
                        className={`${contactCardClasses} hover:-translate-y-1.5 hover:shadow-soft`}
                      >
                        <img
                          src={emailButton}
                          alt={t("sportello.emailAlt")}
                          className="max-h-40 object-contain"
                        />
                      </a>
                    ) : (
                      <div className={`${contactCardClasses} cursor-not-allowed opacity-50`}>
                        <img
                          src={emailButton}
                          alt={t("sportello.emailAlt")}
                          className="max-h-40 object-contain"
                        />
                      </div>
                    )}
                    {canContact && (
                      <p className="mt-3 text-sm text-muted-foreground">{t("sportello.emailText")}</p>
                    )}
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default SportelloSanitario;
