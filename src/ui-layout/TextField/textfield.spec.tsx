import React, { ReactNode } from "react";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "styled-components";
import { TextField } from ".";
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
};

const renderWithTheme = (component: any) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("TextField component", () => {
  it("renders the TextField with label and value", () => {
    renderWithTheme(
      <TextField label="Name" value="John Doe" onChange={() => {}} />
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
  });

  it("applies the small size styles", () => {
    renderWithTheme(
      <TextField label="Name" value="" onChange={() => {}} size="small" />
    );
    const input = screen.getByLabelText("Name");
    expect(input).toHaveStyle(`font-size: 12px`);
    expect(input).toHaveStyle(`height: 14px`);
  });

  it("applies the medium size styles", () => {
    renderWithTheme(
      <TextField label="Name" value="" onChange={() => {}} size="medium" />
    );
    const input = screen.getByLabelText("Name");
    expect(input).toHaveStyle(`height: 18px`);
    expect(input).toHaveStyle(`font-size: ${theme.typography.fontSize}`);
  });

  it("calls the onChange handler", () => {
    const onChange = jest.fn();
    renderWithTheme(<TextField label="Name" value="" onChange={onChange} />);
    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "Jane Doe" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

});
