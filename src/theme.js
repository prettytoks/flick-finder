import { createTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5',
      light: '#64b5f6',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff',
    },
  },
 
});

export const lightColors = {
  primary: '#3f51b5',
  secondary: '#f50057',
  text: '#212121',
  background: '#f0f0f0',
};

export const darkColors = {
  primary: '#90caf9',
  secondary: '#f48fb1',
  text: '#f0f0f0',
  background: '#212121',
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightColors.primary,
    },
    secondary: {
      main: lightColors.secondary,
    },
    text: {
      primary: lightColors.text,
    },
    background: {
      default: lightColors.background,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: darkColors.primary,
    },
    secondary: {
      main: darkColors.secondary,
    },
    text: {
      primary: darkColors.text,
    },
    background: {
      default: darkColors.background,
    },
  },
});


export const MainContent = styled(Box)(({ theme, darkMode }) => ({
  flexGrow: 1,
  padding: '24px',
  transition: 'background-color 0.3s ease-out',
  backgroundColor: darkMode ? darkColors.background : lightColors.background,
}));


export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

