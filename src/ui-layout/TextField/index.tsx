// src/components/TextInput.tsx
import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string | any;
  label: string | any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  padding: ${(props) => props.theme.spacing.medium};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 8px ${(props) => props.theme.colors.primary};
  }
`;

const StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  font-weight: 500;
  text-transform:capitalize;
  color: ${(props) => props.theme.colors.grayDarker};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const TextField: React.FC<TextInputProps> = (
  { value, onChange, label },
  props
) => {
  return (
    <StyledComponent>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type="text"
        aria-label={label}
        value={value}
        onChange={onChange}
        {...props}
      />
    </StyledComponent>
  );
};
