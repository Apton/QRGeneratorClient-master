/* eslint-disable no-undef */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Toolbar } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import useStyles from './style';
import image from '../../image/Logo Apton Nuovo bianco 3.png';

const Navbar = () => {
  const classes = useStyles();
  const { logout } = useAuth0();
  return (

    <AppBar position="static" color="primary">

      <Toolbar>
        <img src={image} alt="logo" className={classes.image} />
        {document.URL.includes('admin')
          ? (
            <Button onClick={() => logout({ returnTo: 'https://dynamicqrcode.site' })} className={classes.bNav} variant="outlined">
              Logout
            </Button>
          ) : <></>}

      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
