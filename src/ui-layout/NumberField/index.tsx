// src/components/TextInput.tsx
import React, { InputHTMLAttributes } from "react";
import styled, { css, useTheme } from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { tab } from "@testing-library/user-event/dist/tab";

interface TextInputProps
  extends Omit<InputHTMLAttributes<Omit<HTMLInputElement, "size">>, "size"> {
  value?: string | any;
  label: string | any;
  size?: "small" | "medium";
  showIcons?: boolean;
  onNumberChange?: (value: number) => void;
}
const sizeStyles = {
  small: css`
    font-size: 12px;
    height: 14px;
    padding-top: ${(props) => props.theme.spacing.small};
    padding-bottom: ${(props) => props.theme.spacing.small};
  `,
  medium: css`
    height: 18px;
    font-size: ${(props) => props.theme.typography.fontSize};
    padding-top: ${(props) => props.theme.spacing.medium};
    padding-bottom: ${(props) => props.theme.spacing.medium};
  `,
};
const StyledInput = styled.input<{ size: "small" | "medium" }>`
  padding: ${(props) => props.theme.spacing.medium};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  background-color: ${(props) => props.theme.paper.default};
  color: ${(props) => props.theme.text.primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  ${(props) => sizeStyles[props.size]};
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 8px ${(props) => props.theme.colors.primary};
  }
`;

const StyledComponent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

const StyledLabel = styled.label<{ size: "small" | "medium" }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  font-weight: 500;
  text-transform: capitalize;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.small};
  ${(props) => labelSizeStyles[props.size]};
`;

const labelSizeStyles = {
  small: css`
    font-size: 12px;
  `,
  medium: css`
    font-size: ${(props) => props.theme.typography.fontSize};
  `,
};

const PlusButton = styled.button`
  position: absolute;
  top: 70%;
  right: 5px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;
const MinusButton = styled.button`
  position: absolute;
  top: 70%;
  right: 30px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const NumberField: React.FC<TextInputProps> = (
  {
    value,
    onChange,
    label,
    size = "medium",
    disabled,
    showIcons = false,
    onNumberChange,
  },
  props
) => {
  const theme = useTheme();

  return (
    <StyledComponent>
      <StyledLabel size={size}>{label}</StyledLabel>
      <StyledInput
        type="number"
        name={label}
        size={size}
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          disabled != true &&
            onNumberChange &&
            onNumberChange(+e.target.value);
        }}
        {...props}
      />
      {showIcons && (
        <MinusButton
          onClick={() => {
            onNumberChange && onNumberChange((value||0) - 1);
          }}
        >
          <RemoveIcon sx={{ color: theme.icon.primary }} fontSize={size} />
        </MinusButton>
      )}
      {showIcons && (
        <PlusButton
          onClick={() => {
            onNumberChange && onNumberChange((value||0) + 1);
          }}
        >
          <AddIcon sx={{ color: theme.icon.primary }} fontSize={size} />
        </PlusButton>
      )}
    </StyledComponent>
  );
};
