import React, { FC, forwardRef } from 'react';

import { Typography, TypographyProps } from '@mui/material'
import { StyledComponent } from '@emotion/styled'
import {
  HeaderText1,
  HeaderText2,
  HeaderText3,
  HeaderText4,
  HeaderText5,
  HeaderText6,
  BodyText,
} from './styles'
interface TextProps extends Omit<TypographyProps, 'variant'> {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body'
  color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error.main' | 'warning.main'|'grey.700'|'primary.light'
  weight?: number
  textCase?: 'lowercase' | 'uppercase' | 'capitalize'
}
const StyledTypographiesDictionary = {
  h1: HeaderText1,
  h2: HeaderText2,
  h3: HeaderText3,
  h4: HeaderText4,
  h5: HeaderText5,
  h6: HeaderText6,
  body: BodyText,
} as Record<string, StyledComponent<TextProps>>

const getStyledComponent: (props: TextProps) => StyledComponent<TextProps> = ({
  variant,
}) => StyledTypographiesDictionary[`${variant}`] ?? Typography

export const Text: FC<TextProps> = forwardRef(({
  children,
  weight,
  textCase,
  color,
  ...textProps
}, ref) => {
  const StyledText = getStyledComponent(textProps)

  return (
    <StyledText
      {...textProps}
      color={color ?? 'textPrimary'}
      sx={{ ...textProps.sx, fontWeight: weight, textTransform: textCase ?? 'none' }}
    >
      {children}
    </StyledText >
  )
})
