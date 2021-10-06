// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({

  row: {
    padding: '1em',
    '@media (min-width:600px)': {
      padding: '3em',
    },
  },

  paper: {
    '&:hover': {
      transform: 'scale(1.03, 1.03)',
      cursor: 'pointer',
    },
  },

}));
export default useStyles;
