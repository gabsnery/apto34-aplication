import { tokens } from "./tokens";

// src/themes.ts
export const lightTheme = {
  ...tokens,
  paper:{
    default:tokens.colors.white,
    dark:tokens.colors.grayMedium,
    primaryDark:tokens.colors.primary,
    selected:tokens.colors.grayLight,
  },
  text:{
    primary:tokens.colors.grayDarker,
    secondary:tokens.colors.grayMedium,
    terciary:tokens.colors.primaryLight,
  },
  icon:{
    primary:tokens.colors.grayDark
  },
  colors: {
    ...tokens.colors,
    background: "#ffffff",
    surface: "#ffffff",
    onBackground: "#000000",
    onSurface: "#000000",
  },
};

export const darkTheme = {
  ...tokens,
  paper:{
    default:tokens.colors.grayDarker,
    dark:tokens.colors.grayDarker,
    primaryDark:tokens.colors.grayDarker,
    selected:tokens.colors.grayMedium,
  },
  text:{
    primary:tokens.colors.grayLight,
    secondary:tokens.colors.gray,
    terciary:tokens.colors.grayMedium,
  },
  icon:{
    primary:tokens.colors.gray
  },
  colors: {
    ...tokens.colors,
    background: tokens.colors.black,
    surface: "#121212",
    onBackground: "#ffffff",
    onSurface: "#ffffff",
  },
};
