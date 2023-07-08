import { Button, styled } from '@mui/material'
import { theme } from '..'

export const BaseButton = styled(Button)(() => ({
  fontSize:'14px',
  fontFamily: theme.typography.fontFamily,
  paddingTop:'0',
  paddingBottom: '0',
  letterSpacing:'1px',
  ':disabled': {
    color: theme.palette.text.disabled,
    backgroundColor: theme.palette.background.disabled,
  },
}))

export const PrimaryButton = styled(BaseButton)(() => ({
  color: 'white',
  border: `2px solid ${theme.palette.primary.main}`,
  ':hover': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  ':focus': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
  },
}))

export const SecondaryButton = styled(BaseButton)(() => ({
  color: theme.palette.secondary.main,
  border: `2px solid ${theme.palette.secondary.main}`,
  ':hover': {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  ':focus': {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}))
export const PrimaryTextButton = styled(BaseButton)(() => ({
  ':focus': {
    color: theme.palette.accent,
  },
}))
