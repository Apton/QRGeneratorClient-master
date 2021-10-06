/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
  IconButton, Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { getSitesByID } from '../../store/slice/homeSlice';
import {
  darkmode, imageURI, principalImageURI, sites,
} from '../../store/slice/adminSlice';

const Site = () => {
  const classes = useStyles();
  const dark = useSelector(darkmode);
  const principalImg = useSelector(principalImageURI);
  const img = useSelector(imageURI);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSitesByID());
  }, [dispatch]);

  const site = useSelector(sites);
  const listAllSites = site.map((elem, index) => (
    <div className={classes.row} key={elem.d}>
      <Paper style={{ backgroundColor: dark === true ? 'black' : 'none' }} className={classes.paper} onClick={() => window.open(elem.url)}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ minHeight: '350px' }}
        >
          <Grid item xs={12} sm={3} xl={3}>
            {img[index] !== ''
              ? (
                <img
                  src={img[index]}
                  alt="logo"
                  style={{
                    maxHeight: '300px',
                    '@media (min-width:600px)': {
                      maxWidth: '100%',
                      marginLeft: '2em',
                      marginRight: '2em',
                      display: 'block',
                    },
                    maxWidth: '80%',
                    marginLeft: 'Auto',
                    marginRight: 'Auto',
                    display: 'flex',
                  }}
                />
              ) : <></>}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography style={{ color: dark === true ? 'white' : 'black', marginLeft: '20px' }} variant="h3">
              {elem.titolo}
            </Typography>
            <br />
            <Typography style={{ color: dark === true ? 'white' : 'black', marginLeft: '20px' }} variant="h6">
              {elem.descrizione}
            </Typography>
          </Grid>
          <IconButton
            style={{
              color: dark === true ? 'white' : 'black',
              marginLeft: 'Auto',
              marginRight: 'Auto',
              display: 'flex',
            }}
            onClick={() => window.open(elem.url)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Paper>
    </div>
  ));
  return (
    <>
      {principalImg !== ''
        ? (
          <img
            src={principalImg}
            style={{
              width: document.body.clientWidth, maxHeight: '400px', marginRight: '0', marginLeft: '0',
            }}
            alt="principal"
          />
        ) : <></>}

      <div className={classes.row} bodyAttributes={{ style: 'background-color : black' }}>
        {dark === true ? <style>{'body {background-color: #1d1d1d}'}</style> : <style>{'body {background-color: none}'}</style>}
        {' '}

        {listAllSites}
      </div>
    </>
  );
};
export default Site;
