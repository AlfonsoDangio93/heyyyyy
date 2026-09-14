import { Check } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import FramedImage from "@/components/FramedImage";
import heroImage from "@/assets/hero-aziende.jpg";
import { useTranslation } from "@/i18n/useTranslation";

const WhyWelfareSection = () => {
  const { t } = useTranslation();

  const benefits = [t("whyWelfare.benefit1"), t("whyWelfare.benefit2"), t("whyWelfare.benefit3")];

  return (
    <section className="bg-secondary-pale py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Immagine a sinistra */}
          <Reveal direction="right" duration={900} className="order-2 md:order-1">
            <FramedImage
              src={heroImage}
              alt="Team di professionisti che collabora in ufficio per la prevenzione aziendale"
              className="h-[300px] md:h-[400px]"
              imageClassName="object-center"
            />
          </Reveal>

          {/* Testo a destra */}
          <div className="order-1 flex flex-col items-center gap-8 md:order-2 md:items-end">
            <Reveal delay={120} className="w-full">
              <SectionHeading align="center" className="md:items-end md:text-right">
                {t("whyWelfare.title")}
              </SectionHeading>
            </Reveal>

            <Reveal delay={220} className="w-full">
              <p className="text-center text-lg text-muted-foreground md:text-right md:text-xl">
                {t("whyWelfare.subtitle")}
              </p>
            </Reveal>

            <div className="flex w-full flex-col items-center gap-3 md:items-end">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit} direction="left" delay={320 + index * 120}>
                  <div className="flex items-center gap-3 rounded-pill border border-card-border/10 bg-background px-4 py-3 shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft md:px-5 md:py-4">
                    <Check className="h-6 w-6 flex-shrink-0 text-primary" />
                    <p className="text-base font-medium text-primary md:text-lg">{benefit}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="scale" delay={700}>
              <CtaButton>{t("whyWelfare.cta")}</CtaButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWelfareSection;
