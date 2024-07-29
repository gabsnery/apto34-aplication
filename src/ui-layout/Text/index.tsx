// src/components/Text.tsx
import React from 'react';
import styled from 'styled-components';

interface TextProps {
  children: React.ReactNode;
  weight?: number;
  color?:string;
  variant?: 'body' | 'heading'|string;
  sx?:any;
}
const StyledText = styled.span<TextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => (props.variant === 'heading' ? '24px' : props.theme.typography.fontSize)};
  font-weight: ${(props) => (props.variant === 'heading' ? 'bold' : props.theme.typography.fontWeight)};
  color: ${(props) => props.theme.colors.onBackground};
`;

export const Text: React.FC<TextProps> = ({ children, variant = 'body' }, props) => {
  return <StyledText variant={variant} {...props}>{children}</StyledText>;
};