/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';

import {
  IconButton, TextField,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useAuth0 } from '@auth0/auth0-react';
import QRCode from 'qrcode.react';
import PhotoIcon from '@material-ui/icons/Photo';
import Navbar from '../../component/Navbar/Navbar';
import useStyles from './style';
import {
  initAdmin, sites, setModify, modify, setDelete, siteInfo,
  setSiteInfo, confirmModify, setImageURI, imageURI, setIndex, indexActive,
  resetSiteInfo,
  setDarkMode,
  darkmode, changeMode, setImage, principalImageURI,
  delPrincipalImage, setPrincipalImageID,
} from '../../store/slice/adminSlice';
import { openNewSiteDialog } from '../../store/slice/dialogSlice';
import DialogNewSite from '../../component/DialogNewSite/DialogNewSite';
import DialogDelete from '../../component/DialogDelete/DialogDelete';
import {
  id, idAuth, setIDAuth,
} from '../../store/slice/loginSlice';
import {
  loaded,
} from '../../store/slice/loadSlice';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: '25px',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Admin = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const site = useSelector(sites);
  const idA = useSelector(idAuth);
  const temporarySite = useSelector(siteInfo);
  const [titleSearch, setTitle] = useState('');
  const uriImage = useSelector(imageURI);
  const idUser = useSelector(id);
  const indA = useSelector(indexActive);
  const isLoaded = useSelector(loaded);
  const dark = useSelector(darkmode);
  const principalImg = useSelector(principalImageURI);

  if (user && user.sub !== '' && idA === '') {
    dispatch(setIDAuth(user?.sub));
  }
  if (user) {
    dispatch(initAdmin());
  }

  const isModify = useSelector(modify);
  const classes = useStyles();

  const inputFile = useRef();
  const onButtonClick = () => {
    inputFile.current.click();
  };

  const listSites = site?.map((element, index) => {
    const {
      id, titolo, descrizione, immagine, url,
    } = element;
    if (element.titolo.includes(titleSearch)) {
      return (
        <StyledTableRow key={element?.id}>
          <StyledTableCell width="20%" component="th" scope="row">
            {isModify === element?.id
              ? (
                <TextField
                  fullWidth
                  onChange={(e) => dispatch(setSiteInfo({ name: 'titolo', value: e.target.value }))}
                  value={temporarySite?.titolo}
                >
                  {' '}
                  {element?.titolo}
                </TextField>
              ) : <>{element?.titolo}</>}
          </StyledTableCell>
          <StyledTableCell width="30%" component="th" scope="row">
            {isModify === element?.id
              ? (
                <TextField
                  fullWidth
                  multiline
                  style={{ paddingRight: '3em' }}
                  onChange={(e) => dispatch(setSiteInfo({ name: 'descrizione', value: e.target.value }))}
                  value={temporarySite?.descrizione}
                >
                  {' '}
                  {element?.descrizione}
                </TextField>
              ) : <>{element?.descrizione}</>}
          </StyledTableCell>
          <StyledTableCell width="20%" component="th" scope="row">
            {isModify === element?.id
              ? (
                <>
                  <Grid
                    container
                    direction="row"
                    justify="flex_start"
                    alignItems="center"
                  >
                    {!uriImage[index] ? <></>
                      : <img src={uriImage[index]} alt="logo" width="auto" height="150" />}
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
                          dispatch(setImageURI({ index, uri }));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <IconButton style={{ marginLeft: '1em' }} onClick={onButtonClick}>
                      <PublishIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(setImageURI({ index, uri: '' }))}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </>
              ) : (
                <>
                  {' '}
                  {!uriImage[index] ? <></>
                    : <img src={uriImage[index]} alt="logo" width="auto" height="150" />}
                </>
              )}
          </StyledTableCell>
          <StyledTableCell width="20%" component="th" scope="row">
            {isModify === element?.id
              ? (
                <TextField
                  fullWidth
                  onChange={(e) => dispatch(setSiteInfo({ name: 'url', value: e.target.value }))}
                  value={temporarySite?.url}
                >
                  {' '}
                  {element?.url}
                </TextField>
              ) : <>{element?.url}</>}
          </StyledTableCell>
          <StyledTableCell width="5%" align="right" component="th" scope="row">
            <IconButton onClick={() => dispatch(setDelete(index))}>
              <DeleteIcon />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell width="5%" align="left" component="th" scope="row">
            {isModify === element.id
              ? (
                <IconButton onClick={() => {
                  dispatch(confirmModify(index));
                  dispatch(resetSiteInfo());
                  dispatch(setIndex(''));
                }}
                >
                  <CheckIcon />
                </IconButton>
              )
              : (
                <IconButton
                  onClick={() => {
                    if (indA !== '') {
                      dispatch(confirmModify(indA));
                    }
                    dispatch(setModify({
                      id, titolo, descrizione, immagine, url,
                    }));
                    dispatch(setIndex(index));
                  }}
                >
                  <CreateIcon />
                </IconButton>
              )}
          </StyledTableCell>
        </StyledTableRow>
      );
    }
    return (<></>);
  });
  return (
    <>

      <div>
        <Navbar />
        {!isLoaded || idA === ''
          ? (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.hHeader}
            >
              <CircularProgress disableShrink size={75} />
            </Grid>
          )
          : (
            <div className={classes.body}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
                style={{ marginBottom: '30px' }}
              >
                <Fab
                  disabled={isModify !== '0'}
                  onClick={() => {
                    dispatch(openNewSiteDialog());
                  }}
                  color="primary"
                  className={classes.fab}
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-end"
                style={{ marginBottom: '30px' }}
              >

                <div>
                  {principalImg !== ''
                    ? <img src={principalImg} style={{ width: '500px', marginLeft: '15px' }} alt="header" /> : (
                      <PhotoIcon style={{
                        width: '300px',
                        fontSize: '30px',
                        borderColor: '#91091E',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        height: '50px',
                        marginBottom: '-20px',
                        marginLeft: '15px',
                      }}
                      />
                    )}
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
                        dispatch(setImage(uri));
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <IconButton onClick={() => {
                    dispatch(delPrincipalImage());
                    dispatch(setImage(''));
                    dispatch(setPrincipalImageID(''));
                  }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <Button
                    fullWidth
                    onClick={onButtonClick}
                    className={classes.b}
                    color="primary"
                    variant="contained"
                    endIcon={<PublishIcon />}
                  >
                    Immagine di copertina
                  </Button>
                </div>

                <div>
                  <FormControlLabel
                    value={dark}
                    style={{
                      borderColor: 'black', borderStyle: 'solid', padding: '10px', borderWidth: '1px', marginLeft: '50px',
                    }}
                    control={(
                      <Switch
                        checked={dark}
                        onChange={() => {
                          dispatch(setDarkMode());
                          dispatch(changeMode());
                        }}
                      />

)}
                    label="Modalità colori scuri"
                    labelPlacement="end"
                  />
                </div>
                <div>
                  { idUser !== '' ? <QRCode className={classes.qr} value={`https://dynamicqrcode.site/home?id=${idUser}`} size={200} /> : (
                    <div className={classes.qr} style={{ display: 'inline-block' }} />

                  )}
                </div>
                <div>
                  <Button
                    onClick={() => window.open(`/home?id=${idUser}`)}
                    className={classes.b}
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: '50px' }}
                  >
                    Visualizza sito
                  </Button>
                </div>

              </Grid>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        Titolo
                      </StyledTableCell>
                      <StyledTableCell>Descrizione</StyledTableCell>
                      <StyledTableCell>Immagine</StyledTableCell>
                      <StyledTableCell>Link</StyledTableCell>
                      <StyledTableCell />
                      <StyledTableCell />
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>

                        <TextField onChange={(e) => setTitle(e.target.value)} value={titleSearch} />
                        <FilterListIcon />
                      </StyledTableCell>
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listSites}
                  </TableBody>
                </Table>
              </TableContainer>
              <DialogNewSite />
              <DialogDelete />
            </div>
          )}
      </div>

    </>
  );
};
export default Admin;
