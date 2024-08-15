import { lightTheme, darkTheme } from "../src/ui-layout";
import { GlobalStyles } from "../src/components/globalStyles";
import {  ThemeProvider } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

const preview = {
   parameters: {
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
    docs: { disable: true }
  }, 
  decorators:  [withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: "light",
    Provider: ThemeProvider,
    GlobalStyles,
  })]
};

export default preview;