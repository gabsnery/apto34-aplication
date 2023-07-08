import React, { FC, forwardRef } from "react";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  CircularProgress,
  Link
} from "@mui/material";

import { StyledComponent } from "@emotion/styled"
import { BaseButton, PrimaryTextButton, PrimaryButton, SecondaryButton } from "./styles";
import { theme } from "../theme";

interface ButtonProps extends Omit<MUIButtonProps, "variant"> {
  color: "primary" | "secondary";
  variant: "contained" | "outlined" | "text" | "soft";
  isLoading?: boolean
  component?: string
}

const StyledButtonsDictionary = {
  primarytone_outlined: BaseButton,
  primary_outlined: PrimaryButton,
  primary_contained: PrimaryButton,
  secondary_outlined: SecondaryButton,
  secondary_contained: SecondaryButton,
  primary_text: PrimaryTextButton,
  secondary_text: SecondaryButton,
  primary_soft: PrimaryButton,
  secondary_soft: SecondaryButton
} as Record<string, StyledComponent<MUIButtonProps>>;

const getStyledComponent: (
  props: ButtonProps
) => StyledComponent<MUIButtonProps> = ({ color, variant }) =>
    StyledButtonsDictionary[`${color}_${variant}`] ?? MUIButton;

export const Button: FC<ButtonProps> = forwardRef(({
  children,
  variant,
  isLoading, 
  color,
  ...buttonProps
}, ref) => {
  const StyledButton = getStyledComponent({ color, variant });
  return (
    <StyledButton {...buttonProps} sx={{
      ...buttonProps.sx, textTransform: 'none',
      backgroundColor: (color === 'primary' && variant !== 'text') ? theme.palette.primary['main'] : undefined
    }
    } >

      {isLoading ? (
        <CircularProgress data-testid="loadingIcon" color="info" size={24} />
      ) : children}
    </StyledButton>
  );
});
