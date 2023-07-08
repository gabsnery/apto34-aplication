import React, { useState, FC } from 'react';
import { TextFieldProps as MUITextFieldProps } from '@mui/material'
import { StyledTextField } from './styles'

interface TextFieldProps extends Omit<MUITextFieldProps, 'variant'> {
  measuringUnit?: string
  variant?: 'outlined' | 'filled' | 'standard' | undefined
}

export const TextField: FC<TextFieldProps> = React.forwardRef(({
  children,
  measuringUnit, variant,
  ...textFieldProps
}, ref) => {
  return (
    <StyledTextField
      variant={variant ? variant : "outlined"}
      
      InputProps={{
        ...textFieldProps.InputProps,
        endAdornment: measuringUnit,
      }}
      InputLabelProps={{
        shrink:true
      }}
      {...textFieldProps}
    >
      {children}
    </StyledTextField>
  )
})
