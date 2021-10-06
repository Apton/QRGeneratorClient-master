import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
  useSelector, useDispatch,
} from 'react-redux';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import useStyles from './style';
import {
  del, setDelete, sites, confirmDelete,
} from '../../store/slice/adminSlice';

/**
 * Vista editor principale
 */
const DialogDelete = () => {
  const dispatch = useDispatch();
  const idDel = useSelector(del);
  const allSites = useSelector(sites);
  const classes = useStyles();

  return (
    <Dialog
      open={idDel !== ''}
      onClose={() => dispatch(setDelete(''))}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"

    >
      <DialogContent>
        <Typography variant="h6">Stai per eliminare questo sito</Typography>
        <br />
        {allSites[idDel]?.titolo}
        <br />
        {allSites[idDel]?.descrizione}
        <br />
        {allSites[idDel]?.url}
        <br />
        {allSites[idDel]?.immagine}
        <br />
        <br />
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Button onClick={() => dispatch(setDelete(''))} color="primary" className={classes.buttonA}>Annulla</Button>
          <Button onClick={() => dispatch(confirmDelete())} variant="contained" color="primary">Conferma</Button>
        </Grid>

      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};
export default DialogDelete;
