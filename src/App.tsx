import { Theme, StyledEngineProvider, Box } from "@mui/material";
import AppRoutes from "./Routes";
import { useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import DefaultContainer from "./components/DefaultContainer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { lightTheme, darkTheme } from "./ui-layout";
import { GlobalStyles } from "./components/globalStyles";
import { ThemeProvider } from "styled-components";
import { GAInitializate } from "utils";
import * as Sentry from "@sentry/react";


Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DNS,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", "https://app.apto34.com"],
  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const App = () => {
  const { t, i18n } = useTranslation();

  const language = useSelector((st: RootState) => st.language);
  const theme = useSelector((st: RootState) => st.theme);

  useEffect(() => {
    const userLang = navigator.language;
    i18n.changeLanguage(language ? language : userLang);
  }, [language]);
  useEffect(() => {
    GAInitializate();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <DefaultContainer>
            <AppRoutes />
          </DefaultContainer>
        </ThemeProvider>
      </Sentry.ErrorBoundary>
    </StyledEngineProvider>
  );
};

export default App;
