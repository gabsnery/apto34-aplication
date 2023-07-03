import { createTheme } from '@mui/material/styles'

export const theme = {
  palette: {
    mode: 'light',
    accent: '#FF4BC6',
    common: {
      black: '#1A1A1A',
      white: '#F2F2F2',
    },
    background: {
      paper: '#FAFAFA',
      default: '#F6F6F6',
      disabled: '#4d4d4d',
    },
    text: {
      primary: '#311818',
      secondary: '#676767',
      disabled: '#958888',
    },
    primary: {
      main: '#EF426F ',
      light: '#F2678B',
      dark: '#A72E4D',
      contrastText: '#F5F5F5',
    },
    secondary: {
      main: '#367831',
      light: '#367831',
      dark: '#367831',
      contrastText: '#F5F5F5',
    },
    error: {
      main: '#f48266',
    },
    success: {
      main: '#b5db63',
      light: '#779573',
      dark: '#323833',
    },
    info: {
      main: '#F485A2',
      light: '#9F9F9F',
    },
    divider: '#5F5B5B',
  },
  typography: {
    fontFamily: 'VisbyCF, Roboto',
    fontSize: 12,
  },
}

export const muiTheme = createTheme(theme as any)
