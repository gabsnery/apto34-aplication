// src/components/Text.tsx
import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface TextProps extends HTMLAttributes<HTMLBaseElement> {
  children: React.ReactNode;
  weight?: number;
  color?: "primary" | "secondary" | "terciary" | "error";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body2";
  sx?: any;
}
const variantStyles = {
  h1: css`
    font-size: 32px;
  `,
  h2: css`
    font-size: 28px;
  `,
  h3: css`
    font-size: 24px;
  `,
  h4: css`
    font-size: 20px;
  `,
  h5: css`
    font-size: 16px;
  `,
  h6: css`
    font-size: 14px;
  `,
  body: css`
    font-size: 16px;
  `,
  body2: css`
    font-size: 12px;
  `,
};
const colorStyles = {
  primary: css`
    color: ${(props) => props.theme.text.primary};
  `,
  secondary: css`
    color: ${(props) => props.theme.text.secondary};
  `,
  terciary: css`
    color: ${(props) => props.theme.text.terciary};
  `,
  error: css`
    color: ${(props) => props.theme.colors.error};
  `,
};

const StyledText = styled.span<TextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  ${(props) => variantStyles[props.variant || "body"]};
  ${(props) => colorStyles[props.color || "secondary"]};
`
StyledText.shouldForwardProp = prop => !['variant'].includes(prop)

export const Text: React.FC<TextProps> = (props) => {
  const { children, variant = "body", color = "primary", ...rest } = props;
  return (
    <StyledText variant={variant} color={color} {...rest}>
      {children}
    </StyledText>
  );
};
