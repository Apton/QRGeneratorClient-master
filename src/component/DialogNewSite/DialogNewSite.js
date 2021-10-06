/* eslint-disable no-undef */
import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import {
  IconButton, Typography, TextField,
} from '@material-ui/core';
import { openNewSiteDialog, newSiteDialog } from '../../store/slice/dialogSlice';
import useStyles from './style';
import {
  addSite, setSiteInfo, siteInfo, resetSiteInfo,
} from '../../store/slice/adminSlice';
import { loadingAdd } from '../../store/slice/loadSlice';

const DialogLogin = () => {
  const open = useSelector(newSiteDialog);
  const dispatch = useDispatch();
  const classes = useStyles();
  const site = useSelector(siteInfo);
  const { user } = useAuth0();
  const idAuth0 = user?.sub;
  const inputFile = useRef();
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const isLoading = useSelector(loadingAdd);
  const { immagine } = site;

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(openNewSiteDialog());
        dispatch(resetSiteInfo());
      }}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >

          <Typography variant="h4" align="center">
            <br />
            Aggiungi un nuovo sito
          </Typography>

        </Grid>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >

          <TextField
            onChange={(e) => {
              const { value } = e.target;
              dispatch(setSiteInfo({ name: 'titolo', value }));
            }}
            fullWidth
            className={classes.tf}
            variant="outlined"
            label="Titolo"
            value={site.titolo}
          />
          <TextField
            onChange={(e) => {
              const { value } = e.target;
              dispatch(setSiteInfo({ name: 'descrizione', value }));
            }}
            fullWidth
            multiline
            rows={5}
            className={classes.tf}
            variant="outlined"
            label="Descrizione"
            value={site.descrizione}
          />
          <div>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {!immagine ? <TextField disabled style={{ marginTop: '1em' }} variant="outlined" placeholder="Immagine" />
                : <img src={immagine} alt="logo" style={{ maxWidth: '200px', marginTop: '1em' }} />}

              <input
                style={{ display: 'none' }}
                ref={inputFile}
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = function () {
                    console.error('RESULT', reader.result);
                    const uri = reader.result;
                    dispatch(setSiteInfo({ name: 'immagine', value: uri }));
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <IconButton className={classes.tf} onClick={onButtonClick}>
                <PublishIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(setSiteInfo({ name: 'immagine', value: '' }))} className={classes.tf}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </div>
          <TextField
            onChange={(e) => {
              const { value } = e.target;
              dispatch(setSiteInfo({ name: 'url', value }));
            }}
            fullWidth
            className={classes.tf}
            variant="outlined"
            label="Link"
            value={site.url}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Button
            onClick={() => {
              dispatch(openNewSiteDialog());
              dispatch(resetSiteInfo());
            }}
            className={classes.buttonA}
            color="primary"
          >
            Annulla
          </Button>
          <Button
            disabled={site.titolo === '' && site.descrizione === ''
          && site.immagine === '' && site.url === ''}
            onClick={() => dispatch(addSite(idAuth0))}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Aggiungi
          </Button>
          {isLoading ? <CircularProgress size={20} style={{ margin: '0.5em' }} disableShrink /> : <></>}

        </Grid>

      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};
export default DialogLogin;
