// src/components/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
}


const variantStyles = {
  primary: css`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.onPrimary};

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryVariant};
    }
  `,
  secondary: css`
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.onSecondary};

    &:hover {
      background-color: ${(props) => props.theme.colors.secondaryVariant};
    }
  `,
  tertiary: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.onPrimary};
    }
  `,
};



const StyledButton = styled.button<ButtonProps>`
  padding: ${(props) => props.theme.spacing.medium};
  border: none;
  border-radius: 4px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  cursor: pointer;

  ${(props) => variantStyles[props.variant || 'primary']}
`;

export const Button: React.FC<ButtonProps> = ({ children, onClick },props) => {
  return <StyledButton onClick={onClick} {...props}>{children}</StyledButton>;
};

