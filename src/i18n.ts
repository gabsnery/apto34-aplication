import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./assets/locales/en-us.json";
import pt from "./assets/locales/pt-br.json";

const resources = {
  ['en-US']:en,
  ['pt-BR']:pt,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
