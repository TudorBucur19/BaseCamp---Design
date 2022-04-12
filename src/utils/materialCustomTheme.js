import { grey, red } from '@mui/material/colors';

export const customTheme = {
    palette: {
        primary: {
          main: '#666666',
        },
        secondary: {
          main: '#6088a4',
        },
        borders: {
          main: grey[600],          
        },
        danger: {
          main: red[700]
        },
      },

      typography: {
        fontFamily: "'Arial', 'sans-serif'",
        h3: {
          '@media (max-width:600px)': {
            fontSize: '1.5rem',
          },
        },
        h5: {
          '@media (max-width:600px)': {
            fontSize: '1rem',
          },
      },      
      }
};