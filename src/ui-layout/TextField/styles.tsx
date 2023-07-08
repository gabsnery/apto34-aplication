import { TextField, styled } from "@mui/material";
import { theme } from "..";

export const StyledTextField = styled(TextField)(() => ({
  fontFamily: theme.typography.fontFamily,
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
    fontSize:'16px'
  },
  "& .MuiInputBase-root": {
    color: theme.palette.text.primary,
    // borderRadius: 10,
    backgroundColor: theme.palette.background.default
  },
  "& .MuiFilledInput-input": {
    paddingTop:'15px',
    fontWeight: 700
  },
  
  '& .MuiInputBase-root.Mui-focused': {
    backgroundColor: theme.palette.background.default
  },
  "& .MuiFilledInput-root:before": {
    borderBottom: `2px solid ${theme.palette.common.black}`
  },
  "& .MuiFilledInput-root:after": {
    borderBottom: `2px solid ${theme.palette.primary.main}`
  },
  "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
    borderBottom: `2px solid ${theme.palette.primary.main}`
  },
  "& .MuiInputLabel-shrink": {
    fontSize: "14px",
    fontWeight:700,
    letterSpacing:'2px'
  }
}));
