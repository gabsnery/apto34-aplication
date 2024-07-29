import { Theme, StyledEngineProvider, Box } from "@mui/material";
import AppRoutes from "./Routes";
import { useTheme } from "@mui/material";
import "./App.css";
import DefaultContainer from "components/DefaultContainer";
import ThemeProvider from "ui-layout/teamProvider";

const App = () => {
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
