'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff4b57',
            dark: '#e3434e',
            light: '#ff616c'
        },
        secondary: {
            main: '#1d4ed8',
            dark: '#5859b2',
            light: '#3669f5'
        }
    }
  });
export {theme}