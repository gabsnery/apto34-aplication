import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Importações para Vitest
import { ThemeProvider } from "styled-components";
import { Button } from ".";
import { lightTheme } from "ui-layout/theme";


const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Button component", () => {

  it("applies the primary variant styles", () => {
    renderWithTheme(<Button variant="primary" onChange={()=>{}}>Primary</Button>);
    const button = screen.getByText("Primary");
    expect(button).toHaveStyle(`background-color: ${lightTheme.colors.primary}`);
    expect(button).toHaveStyle(`color: ${lightTheme.colors.onPrimary}`);
  });

  it("applies the secondary variant styles", () => {
    renderWithTheme(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText("Secondary");
    expect(button).toHaveStyle(`border: 2px solid ${lightTheme.colors.primary}`);
    expect(button).toHaveStyle(`color: ${lightTheme.text.primary}`);
  });
});
