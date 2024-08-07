// src/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const ThemeContext = createContext<any>(null);

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSelector((st: RootState) => st.theme);


  return (
    <ThemeContext.Provider value={{theme:theme === "dark"?darkTheme:lightTheme }}>
      <StyledThemeProvider theme={theme === "dark"?darkTheme:lightTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
