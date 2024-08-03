import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-locize-backend'
const locizeOptions = {
  projectId:process.env.REACT_APP_I18N_PROJECTID ,
  apiKey: process.env.REACT_APP_I18N_APIKEY ,
}

i18n.use(Backend)
.use(initReactI18next) .init({
  compatibilityJSON: 'v4', 
  fallbackLng: "pt-BR",
  supportedLngs: ['pt-BR','en-US'],
  partialBundledLanguages: true,
  interpolation: {
    escapeValue: false,
  },
  backend: locizeOptions,

});

export default i18n;
