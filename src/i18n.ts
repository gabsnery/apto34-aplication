import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18n.use(resourcesToBackend((language: any, namespace: any) => import(`./assets/locales/${language}/${namespace}.json`)))
.use(initReactI18next) .init({
  compatibilityJSON: 'v4', 
  supportedLngs: ['pt-BR','en-US'],
  partialBundledLanguages: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
