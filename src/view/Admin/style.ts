// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({

  body: {
    padding: '3em',

  },
  row: {
    padding: '5em',
  },
  paper: {
    padding: '3em',
    marginTop: '6em',
  },
  tf: {
    margin: '1em',
    marginTop: '5em',
  },
  button: {
    marginTop: '2em',
  },
  bNav: {
    fontSize: '25px',
    margin: '1em',
    marginRight: '0px',
    marginLeft: 'auto',
    color: 'white',
    borderColor: 'white',
    textTransform: 'none',
  },
  image: {
    width: '200px',
    high: 'auto',
  },
  fab: {
    marginBottom: '2em',
  },

  b: {
    margin: '1em',
  },

  qr: {
    borderColor: theme.palette.secondary.main,
    borderStyle: 'dotted',
    padding: '1em',
    borderWidth: '15px',
    borderRadius: '5px',
    width: '200px',
    height: '200px',
    marginLeft: '2em',
    marginBottom: '-1em',
  },
  hHeader: {
    height: '230px',
  },
  bottom: {
    marginBottom: '2em',
  },

}));
export default useStyles;
