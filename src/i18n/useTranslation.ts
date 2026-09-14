import { useLanguage } from './LanguageContext';

export const useTranslation = () => {
  const { language, setLanguage, t } = useLanguage();
  
  return {
    t,
    language,
    setLanguage,
    isItalian: language === 'it',
    isEnglish: language === 'en',
  };
};
