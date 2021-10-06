/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React from 'react';
import { Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import Navbar from '../../component/Navbar/Navbar';

/**
 * Vista editor principale
 */
const VerifyEmail = () => {
  const { user } = useAuth0();
  const classes = useStyles();
  if (user?.email_verified === true) {
    window.location.href = 'https://dynamicqrcode.site/admin';
  }
  return (
    <>
      {user?.email_verified === false ? (
        <div>
          <Navbar />
          <Typography align="center" className={classes.title} variant="h4" color="secondary">
            Per effettuare il login devi verificare la tua email.
            Controlla nella tua posta e clicca sul link per confermarla.

          </Typography>
          <Typography align="center" variant="h3" color="primary">
            <br />
            Fatto? bene, fai il login e inizia subito e creare!
          </Typography>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button onClick={() => location.reload()} style={{ fontSize: '30px', margin: '2em' }} variant="contained" color="primary">
              Login
            </Button>
          </Grid>

        </div>
        ) : <></>}
    </>
  );
};
export default VerifyEmail;
