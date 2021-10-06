import React from 'react';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import {
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from '@auth0/auth0-react';
import useStyles from './style';
import Navbar from '../../component/Navbar/Navbar';

/**
 * Vista editor principale
 */
const Editor = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h1" color="secondary">
          Genera il tuo
        </Typography>
        <Typography variant="h1" color="primary">
          <br />
          QR Code
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <PersonIcon color="primary" style={{ fontSize: '60px' }} />
          </Grid>
          <Typography variant="h4" align="center">
            <br />
            Crea il tuo account
          </Typography>
          <Button onClick={() => loginWithRedirect({ ui_locales: 'it' })} className={classes.button} fullWidth variant="contained" color="secondary">
            Crea
          </Button>
          <Typography align="center">oppure</Typography>
          <Button style={{ marginTop: '1em' }} onClick={() => loginWithRedirect({ ui_locales: 'it' })} fullWidth variant="contained" color="secondary">
            Effettua login
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};
export default Editor;
