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
    border: 2px solid ${(props) => props.theme.colors.primaryVariant};
    &:hover {
      background-color: ${(props) => props.theme.colors.primaryVariant};
    }
  `,
  primaryDisabled: css`
    background-color: ${(props) => props.theme.colors.gray};
    color: ${(props) => props.theme.colors.grayMedium};
    border: 2px solid ${(props) => props.theme.colors.grayDark};
    cursor:unset;
  `,
  secondary: css`
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.text.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.onPrimary};
    }
  `,
  secondaryDisabled: css`
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.grayDark};
    color: ${(props) => props.theme.colors.grayMedium};
    cursor:unset;
  `,
  tertiary: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: none;

    &:hover {
      color: ${(props) => props.theme.colors.primaryVariant};
    }
  `,
  tertiaryDisabled: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.grayDark};
    border: none;
    cursor:unset;
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
  ${(props) => variantStyles[`${props.variant || "primary"}${props.disabled?'Disabled':''}` ]}
`;

export const Button: React.FC<ButtonProps> = (
  props
) => {
  const { children, onClick, variant = "primary",disabled, ...rest } = props; 
  return (
    <StyledButton onClick={onClick} variant={variant} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  );
};
