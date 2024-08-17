import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Importações para Vitest
import { ThemeProvider } from "styled-components";
import { PasswordField } from ".";
import userEvent from "@testing-library/user-event";

const theme = {
  colors: {
    primary: "#000",
    gray: "#ccc",
    grayMedium: "#999",
    grayDark: "#666",
  },
  text: {
    primary: "#000",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  },
  paper: {
    default: "#fff",
  },
  icon: {
    primary: "#fff",
  },
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("PasswordField component", () => {
  it("renders the PasswordField with label and value", () => {
    renderWithTheme(
      <PasswordField label="Name" value="John Doe" onChange={() => {}} />
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
  });

  it("applies the small size styles", () => {
    renderWithTheme(
      <PasswordField label="Name" value="" onChange={() => {}} size="small" />
    );
    const input = screen.getByLabelText("Name");
    expect(input).toHaveStyle(`font-size: 12px`);
    expect(input).toHaveStyle(`height: 14px`);
  });

  it("applies the medium size styles", () => {
    renderWithTheme(
      <PasswordField label="Name" value="" onChange={() => {}} size="medium" />
    );
    const input = screen.getByLabelText("Name");
    expect(input).toHaveStyle(`height: 18px`);
    expect(input).toHaveStyle(`font-size: ${theme.typography.fontSize}`);
  });

  it("calls the onChange handler", () => {
    const onChange = vi.fn(); // Substitua jest.fn() por vi.fn()
    renderWithTheme(<PasswordField label="Name" value="" onChange={onChange} />);
    const input = screen.getByLabelText("Name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Jane Doe" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
