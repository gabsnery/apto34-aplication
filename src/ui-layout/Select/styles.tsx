import { filledInputClasses, Select, styled } from '@mui/material'

export const BaseSelect = styled(Select)(() => ({
  color: 'white',
  borderRadius: '6px',
  '& .MuiSelect-select': {
    display: 'flex',
  },
  "& .MuiInputLabel-shrink": {
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: '2px'
  },
}))
