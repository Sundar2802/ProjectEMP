import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8', // Bright Blue
    },
    secondary: {
      main: '#fbbc05', // Bright Yellow
    },
    background: {
      default: '#f5f5f5', // Light Grey
      paper: '#ffffff', // White
    },
    text: {
      primary: '#212121', // Dark Grey for text
      secondary: '#757575', // Medium Grey for secondary text
    },
    error: {
      main: '#d32f2f', // Red for errors
    },
    success: {
      main: '#388e3c', // Green for success messages
    },
    info: {
      main: '#0288d1', // Light Blue for info messages
    },
    warning: {
      main: '#ffa000', // Amber for warnings
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for buttons
          textTransform: 'none', // Keep button text case as provided
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
