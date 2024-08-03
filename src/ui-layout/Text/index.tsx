// src/components/Text.tsx
import React from "react";
import styled, { css } from "styled-components";

interface TextProps {
  children: React.ReactNode;
  weight?: number;
  color?: "primary" | "secondary" | "terciary";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";
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
};
const colorStyles = {
  primary: css`
    color: ${(props) => props.theme.colors.grayDarker};
  `,
  secondary: css`
    color: ${(props) => props.theme.colors.grayMedium};
  `,
  terciary: css`
    color: ${(props) => props.theme.colors.primaryLight};
  `,
};

const StyledText = styled.span<TextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  ${(props) => variantStyles[props.variant || "body"]};
  ${(props) => colorStyles[props.color || "secondary"]};
`;

export const Text: React.FC<TextProps> = (
  props
) => {
  const { children,variant = "body",color='primary', ...rest } = props; 
  return (
    <StyledText variant={variant} color={color} {...rest}>
      {children}
    </StyledText>
  );
};
