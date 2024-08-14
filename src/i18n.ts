import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-locize-backend'
const locizeOptions = {
  projectId:import.meta.env.VITE_I18N_PROJECTID ,
  apiKey: import.meta.env.VITE_I18N_APIKEY ,
}

i18n.use(Backend)
.use(initReactI18next) .init({
  compatibilityJSON: 'v4', 
  supportedLngs: ['pt-BR','en-US'],
  partialBundledLanguages: true,
  interpolation: {
    escapeValue: false,
  },
  backend: locizeOptions,

});

export default i18n;
