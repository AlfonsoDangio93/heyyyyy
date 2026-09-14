import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import FramedImage from "@/components/FramedImage";
import heroImage from "@/assets/hero-cliniche-waiting.png";
import { useTranslation } from "@/i18n/useTranslation";

const ClinicHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden bg-accent py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col space-y-6 md:space-y-8">
            <Reveal threshold={0} duration={800}>
              <h1 className="font-display text-fluid-4xl font-normal tracking-tight text-primary">
                {t("clinicHero.title")}
                <br />
                {t("clinicHero.titleLine2")}
              </h1>
            </Reveal>
            <Reveal threshold={0} delay={140} duration={800}>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("clinicHero.subtitle")}
              </p>
            </Reveal>
          </div>

          <Reveal
            direction="scale"
            threshold={0}
            delay={200}
            duration={900}
            className="flex justify-center lg:justify-end"
          >
            <FramedImage
              src={heroImage}
              alt="Paziente in sala d'attesa"
              loading="eager"
              fit="natural"
              className="max-w-md lg:max-w-lg motion-safe:animate-float"
            />
          </Reveal>
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Reveal delay={120}>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:mb-8 md:text-xl">
              {t("clinicHero.bottomText")}
            </p>
          </Reveal>
          <Reveal direction="scale" delay={240}>
            <CtaButton className="text-lg">{t("clinicHero.cta")}</CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ClinicHeroSection;
