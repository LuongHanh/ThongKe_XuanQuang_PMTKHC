// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e452a', // Xanh dương đậm
    },
    secondary: {
      main: '#f50057', // Hồng đậm
    },
    background: {
      default: '#f5f7fa', // Nền tổng thể
      paper: '#ffffff',   // Nền của Paper
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
  },
});

export default theme;
