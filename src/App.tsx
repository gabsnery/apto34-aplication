import { ThemeProvider, Theme, StyledEngineProvider, Box } from "@mui/material";
import { muiTheme } from "./ui-layout/theme";
import AppRoutes from "./Routes";
import { useTheme } from '@mui/material';
import "./App.css";
import DefaultContainer from "components/DefaultContainer";


const App = () => {
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
      
          <DefaultContainer>
            <AppRoutes />
          </DefaultContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
