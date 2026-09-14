import problemFondiImage from "@/assets/problem-fondi-sanitari.jpg";
import problemScreeningImage from "@/assets/problem-screening.jpg";
import problemAssicurazioniImage from "@/assets/problem-assicurazioni.jpg";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

const ProblemSection = () => {
  const { t } = useTranslation();

  const problems = [
    {
      image: problemFondiImage,
      title: t('problem.card1.title'),
      description: t('problem.card1.description'),
    },
    {
      image: problemScreeningImage,
      title: t('problem.card2.title'),
      description: t('problem.card2.description'),
    },
    {
      image: problemAssicurazioniImage,
      title: t('problem.card3.title'),
      description: t('problem.card3.description'),
    },
  ];

  // Function to get box position based on index
  const getBoxPosition = (index: number) => {
    // Su mobile: tutti i box in basso a sinistra (uniformità)
    // Su desktop: mantieni il layout originale (primo in alto-sx, secondo in basso-sx, terzo in alto-dx)
    if (index === 0) {
      return "-bottom-6 left-4 md:top-0 md:-translate-y-1/2 md:left-6 md:bottom-auto";
    }
    if (index === 1) {
      return "-bottom-6 left-4 md:-bottom-8 md:left-6";
    }
    if (index === 2) {
      return "-bottom-6 left-4 md:top-0 md:-translate-y-1/2 md:right-6 md:left-auto md:bottom-auto";
    }
    return "-bottom-6 left-4";
  };

  // Function to get container padding based on index
  const getContainerPadding = (index: number) => {
    // Su mobile, padding sotto per tutti i box che sporgono in basso
    return "pb-10 md:pb-0";
  };

  return (
    <section className="py-16 md:py-24 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading className="max-w-4xl mx-auto mb-20 md:mb-24">
            {t('problem.title')}
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {problems.map((problem, index) => (
            <Reveal key={index} delay={140 + index * 130} className={`relative group ${getContainerPadding(index)}`}>
              {/* Image container with rounded corners */}
              <div className="relative aspect-[4/3] rounded-[28px] md:rounded-[32px] overflow-hidden">
                <img src={problem.image} alt={problem.title} className="w-full h-full object-cover" />
              </div>

              {/* Blue box positioned outside the image */}
              <div
                className={`absolute ${getBoxPosition(index)} bg-secondary rounded-[20px] px-5 py-4 md:px-6 md:py-5 max-w-[75%] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1`}
              >
                <h3 className="text-base md:text-lg font-bold text-primary mb-1.5 leading-tight">{problem.title}</h3>
                <p className="text-sm text-primary/90">{problem.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
