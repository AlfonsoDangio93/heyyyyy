import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import supportImage from "@/assets/Heylucy_-_Prevenzione_in_azienda.jpg";
import { useTranslation } from "@/i18n/useTranslation";

const SupportSection = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden bg-primary py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 pl-4 lg:col-span-5 lg:pl-8">
            <Reveal>
              <SectionHeading align="left" size="large" tone="light">
                {t("support.title")}
              </SectionHeading>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-fluid-lg leading-relaxed text-accent/85">
                {t("support.description")}
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={200} duration={900} className="flex items-center justify-center lg:col-span-7">
            <img
              src={supportImage}
              alt="Sportello sanitario HeyLucy - App mobile con supporto WhatsApp"
              loading="lazy"
              className="h-auto w-full max-w-2xl object-contain lg:max-w-none motion-safe:animate-float"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
