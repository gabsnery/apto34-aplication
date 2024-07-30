// src/components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
}

const variantStyles = {
  primary: css`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.onPrimary};
    border: 1px solid ${(props) => props.theme.colors.primaryVariant};

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryVariant};
    }
  `,
  secondary: css`
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.grayMedium};

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.onPrimary};
    }
  `,
  tertiary: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: none;

    &:hover {
      color: ${(props) => props.theme.colors.primaryVariant};
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  padding: ${(props) => props.theme.spacing.small};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  border-radius: 4px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  cursor: pointer;
  ${(props) => variantStyles[props.variant || "primary"]}
`;

export const Button: React.FC<ButtonProps> = (
  { children, onClick, variant = "primary" },
  props
) => {
  return (
    <StyledButton onClick={onClick} variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
