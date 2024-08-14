import { Theme, StyledEngineProvider, Box } from "@mui/material";
import AppRoutes from "./Routes";
import { useTheme } from "@mui/material";
import "./App.css";
import DefaultContainer from "components/DefaultContainer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { lightTheme, darkTheme } from './ui-layout';
import { GlobalStyles } from "components/globalStyles";
import {ThemeProvider} from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const { t, i18n } = useTranslation()

  const language = useSelector((st: RootState) => st.language);
  const theme = useSelector((st: RootState) => st.theme);
  
  useEffect(() => {
    const userLang = navigator.language
    i18n.changeLanguage(language?language:userLang)
  }, [language]);
  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles/>
        <DefaultContainer>
          <AppRoutes />
        </DefaultContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
