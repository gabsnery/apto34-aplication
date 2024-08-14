import { DocsContainer } from "@storybook/addon-docs";
import { useDarkMode } from "storybook-dark-mode";
import React from "react";
import { lightTheme, darkTheme } from "../src/ui-layout";
import { GlobalStyles } from "../src/components/globalStyles";
import {  ThemeProvider } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

const preview = {
/*   parameters: {
    docs: {
      container: (context: any) => {
        const isDark = useDarkMode();

        const props = {
          ...context,
          theme: isDark ? darkTheme : lightTheme,
        };

        return React.createElement(DocsContainer, props);
      },
    },
  }, */
  decorators:  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: "light",
    Provider: ThemeProvider,
    GlobalStyles,
  }),
};

export default preview;
