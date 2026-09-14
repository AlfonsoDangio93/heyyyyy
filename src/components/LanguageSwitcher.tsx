import { ArrowLeftRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

const LANGUAGES = {
  it: { flag: "🇮🇹", code: "IT", name: "Italiano" },
  en: { flag: "🇬🇧", code: "EN", name: "English" },
} as const;

/** Voce unica che alterna fra le due lingue a ogni click. */
const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useTranslation();

  const next = language === "it" ? "en" : "it";
  const current = LANGUAGES[language];
  const label = `${t("header.switchTo")} ${LANGUAGES[next].name}`;

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      className="group flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3 py-1.5 text-sm font-medium text-foreground transition-all duration-300 ease-out hover:border-primary/50 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={label}
      title={label}
    >
      <span className="text-base leading-none transition-transform duration-300 ease-spring group-hover:scale-125">
        {current.flag}
      </span>
      <span>{current.code}</span>
      <ArrowLeftRight className="h-3.5 w-3.5 text-primary/50 transition-all duration-500 ease-out group-hover:rotate-180 group-hover:text-primary" />
    </button>
  );
};

export default LanguageSwitcher;
