import { createMuiTheme } from '@material-ui/core/styles';

const montserrat = 'Montserrat, sans-serif';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#91091E',
    },
    secondary: {
      main: '#da723c',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'none',

  },
  MuiCssBaseline: {
    '@global': {
      '@font-face': [montserrat],
    },
  },
  overrides: {
    MuiTypography: {
      h4: {
        fontWeight: 300,
        fontSize: '12px',
        '@media (min-width:600px)': {
          fontSize: '20px',
        },
      },
      h1: {
        fontWeight: 300,
        fontSize: '30px',
        '@media (min-width:600px)': {
          fontSize: '60px',
        },
      },
      h2: {
        fontSize: '22px',
        '@media (min-width:600px)': {
          fontSize: '44px',
        },
      },
      h3: {
        fontWeight: 300,
        fontSize: '15px',
        '@media (min-width:600px)': {
          fontSize: '30px',
        },

      },
      h5: {
        fontWeight: 300,
      },
      h6: {
        fontWeight: 300,
        fontSize: '10px',
        '@media (min-width:600px)': {
          fontSize: '20px',
        },
      },

    },
  },
});

export default theme;
