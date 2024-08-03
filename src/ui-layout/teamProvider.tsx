// src/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext<any>(null);

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const activeTheme = localStorage.getItem("@app:activeTheme") as "dark" | "light"

  const toggleTheme = () => {
    localStorage.setItem(
      "@app:activeTheme",
      activeTheme === "light" ? "dark" : "light"
    );
    window.location.reload();
  };

  return (
    <ThemeContext.Provider value={{theme:activeTheme === "dark"?darkTheme:lightTheme, toggleTheme }}>
      <StyledThemeProvider theme={activeTheme === "dark"?darkTheme:lightTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
