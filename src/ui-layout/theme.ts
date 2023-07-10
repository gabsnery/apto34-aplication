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
    grey: {
      50: '#F7F7F7',
      100: '#EDEDED',
      200: '#DEDEDE',
      300: '#CCCCCC',
      400: '#B2B2B2',
      500: '#9C9C9C',
      600: '#717171',
      700: '#595959',
      800: '#404040',
      900: '#2E2E2E',
      A100: '#1A1A1A',
      A200: '#0E0E0E',
    },
    text: {
      primary: '#311818',
      secondary: '#676767',
      disabled: '#958888',
    },
    primary: {
      light: '#FFEDDE',
      main: '#BA977B',
      dark: '#573D2E',
      contrastText: '#fff',
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
    fontFamily: 'Comfortaa',
    fontSize: 12,
  },
}

export const muiTheme = createTheme(theme as any)
