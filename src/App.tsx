import { Theme, StyledEngineProvider, Box } from "@mui/material";
import AppRoutes from "./Routes";
import { useTheme } from "@mui/material";
import "./App.css";
import DefaultContainer from "components/DefaultContainer";
import ThemeProvider from "ui-layout/teamProvider";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const App = () => {
  const { t, i18n } = useTranslation()

 
  
  useEffect(() => {
    const userLang = navigator.language
    console.log("🚀 ~ useEffect ~ userLang:", userLang)
    i18n.changeLanguage(userLang)
  }, []);
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
