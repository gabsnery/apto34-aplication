// src/components/Button.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "styled-components";
import { Button } from "./";

const theme = {
  colors: {
    primary: "#000",
    onPrimary: "#fff",
    primaryVariant: "#333",
    gray: "#ccc",
    grayMedium: "#999",
    grayDark: "#666",
  },
  text: {
    primary: "#000",
  },
  spacing: {
    small: "8px",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  },
};

const renderWithTheme = (component:any) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Button component", () => {
  it("renders the button with children", () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies the primary variant styles", () => {
    renderWithTheme(<Button variant="primary">Primary</Button>);
    const button = screen.getByText("Primary");
    expect(button).toHaveStyle(`background-color: ${theme.colors.primary}`);
    expect(button).toHaveStyle(`color: ${theme.colors.onPrimary}`);
  });

  it("applies the secondary variant styles", () => {
    renderWithTheme(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText("Secondary");
    expect(button).toHaveStyle(`border: 2px solid ${theme.colors.primary}`);
    expect(button).toHaveStyle(`color: ${theme.text.primary}`);
  });

  it("calls the onClick handler", () => {
    const onClick = jest.fn();
    renderWithTheme(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies the disabled styles when the button is disabled", () => {
    renderWithTheme(<Button variant="primary" disabled>Disabled</Button>);
    const button = screen.getByText("Disabled");
    expect(button).toHaveStyle(`background-color: ${theme.colors.grayMedium}`);
    expect(button).toHaveStyle(`color: ${theme.colors.grayMedium}`);
    expect(button).toHaveStyle(`cursor: unset`);
  });
});
