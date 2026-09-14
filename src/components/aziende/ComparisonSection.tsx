import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

// Icona verde per costo basso
const LowCostIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    {/* Cerchio con bordo verde spesso */}
    <circle cx="16" cy="16" r="13" stroke="hsl(var(--success))" strokeWidth="3" fill="none" />
    {/* Simbolo $ verde al centro */}
    <text x="16" y="22" fontSize="16" fontWeight="bold" fill="hsl(var(--success))" textAnchor="middle" fontFamily="sans-serif">
      $
    </text>
  </svg>
);

// Icona rossa per costo alto
const HighCostIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    {/* Triangolo con angoli arrotondati, vertice verso l'alto */}
    <path
      d="M16 4 L28 26 L4 26 Z"
      fill="hsl(var(--danger))"
      stroke="hsl(var(--danger))"
      strokeWidth="1"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* Simbolo $ bianco al centro */}
    <text x="16" y="22" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">
      $
    </text>
  </svg>
);

const renderCellContent = (content: { text: string; icon: string | null }, isHeyLucy: boolean) => {
  const getIcon = () => {
    switch (content.icon) {
      case "check":
        return <Check className="w-5 h-5 text-success stroke-[3]" />;
      case "x":
        return <X className="w-5 h-5 text-danger stroke-[3]" />;
      case "coins-low":
        return <LowCostIcon />;
      case "coins-high":
        return <HighCostIcon />;
      default:
        return null;
    }
  };

  const icon = getIcon();

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{content.text}</span>
    </div>
  );
};

const ComparisonSection = () => {
  const { t } = useTranslation();

  const comparisonData = [
    {
      feature: t('comparison.row1.feature'),
      heylucy: { text: t('comparison.row1.heylucy'), icon: "check" },
      standard: { text: t('comparison.row1.standard'), icon: "check" },
    },
    {
      feature: t('comparison.row2.feature'),
      heylucy: { text: t('comparison.row2.heylucy'), icon: "coins-low" },
      standard: { text: t('comparison.row2.standard'), icon: "coins-high" },
    },
    {
      feature: t('comparison.row3.feature'),
      heylucy: { text: t('comparison.row3.heylucy'), icon: "check" },
      standard: { text: t('comparison.row3.standard'), icon: "x" },
    },
    {
      feature: t('comparison.row4.feature'),
      heylucy: { text: t('comparison.row4.heylucy'), icon: "check" },
      standard: { text: t('comparison.row4.standard'), icon: "x" },
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading className="mb-12">{t('comparison.title')}</SectionHeading>
        </Reveal>

        <div className="max-w-5xl mx-auto">
          {/* Desktop Table */}
          <Reveal delay={140} as="div" className="hidden md:block">
          <Card className="overflow-hidden rounded-card border border-card-border/10 shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="p-4 text-left font-semibold"> </th>
                    <th className="p-4 text-left font-semibold">{t('comparison.heylucy')}</th>
                    <th className="p-4 text-left font-semibold">{t('comparison.standard')}</th>
                  </tr>
                </thead>
                <tbody className="bg-background">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index !== comparisonData.length - 1 ? "border-b border-border" : ""}>
                      <td className="p-4 font-medium text-foreground">{row.feature}</td>
                      <td className="p-4 text-primary font-semibold bg-accent">
                        {renderCellContent(row.heylucy, true)}
                      </td>
                      <td className="p-4 text-muted-foreground">{renderCellContent(row.standard, false)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          </Reveal>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {comparisonData.map((row, index) => (
              <Reveal key={index} delay={index * 110}>
              <Card className="p-6 bg-background rounded-card border border-card-border/10 shadow-card">
                <h3 className="font-bold text-foreground mb-4 text-lg">{row.feature}</h3>
                <div className="space-y-3">
                  <div className="bg-accent p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t('comparison.heylucy')}</p>
                    <div className="text-primary font-semibold">{renderCellContent(row.heylucy, true)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('comparison.standard')}</p>
                    <div className="text-muted-foreground">{renderCellContent(row.standard, false)}</div>
                  </div>
                </div>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
