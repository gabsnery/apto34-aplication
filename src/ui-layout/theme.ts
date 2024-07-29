import { tokens } from "./tokens";

// src/themes.ts
export const lightTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    background: '#ffffff',
    surface: '#ffffff',
    onBackground: '#000000',
    onSurface: '#000000',
  },
};

export const darkTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    background: '#121212',
    surface: '#121212',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
  },
};
