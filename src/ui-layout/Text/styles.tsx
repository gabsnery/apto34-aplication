import { Typography, styled } from '@mui/material'
import { theme } from '..'

export const BaseTypography = styled(Typography)(() => ({
  fontFamily: theme.typography.fontFamily
}))

export const HeaderText1 = styled(BaseTypography)(() => ({
  fontSize: '3.6rem',
  fontWeight: 500,
}))
export const HeaderText2 = styled(BaseTypography)(() => ({
  fontSize: '40px',
}))
export const HeaderText3 = styled(BaseTypography)(() => ({
  fontSize: '34px',
  letterSpacing:'1px'
}))
export const HeaderText4 = styled(BaseTypography)(() => ({
  fontSize: '1.6rem',
}))
export const HeaderText5 = styled(BaseTypography)(() => ({
  fontSize: '1.2rem',
}))
export const HeaderText6 = styled(BaseTypography)(() => ({
  fontSize: '20px',
}))
export const BodyText = styled(BaseTypography)(() => ({
  fontSize: '16px',
}))