import { Theme, StyledEngineProvider, Box } from "@mui/material";
import AppRoutes from "./Routes";
import { useTheme } from "@mui/material";
import "./App.css";
import DefaultContainer from "components/DefaultContainer";
import ThemeProvider from "ui-layout/teamProvider";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const App = () => {
  const { t, i18n } = useTranslation()
  const language = useSelector((st: RootState) => st.language);
  
  useEffect(() => {
    const userLang = navigator.language
    i18n.changeLanguage(language?language:userLang)
  }, [language]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <DefaultContainer>
          <AppRoutes />
        </DefaultContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
