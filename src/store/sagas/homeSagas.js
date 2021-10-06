/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import {
  call, put, select, all,
} from 'redux-saga/effects';
import { getInfoByID, getImage } from '../api';
import {
  setSites, setURIList, imageURI, initDarkMode,
  setPrincipalImageID, setImage,
} from '../slice/adminSlice';

/**
 * Inizializzazione della home dell'autoanamnesi senza etichetta
 */
export default function* getSitesHome() {
  try {
    const queryString = require('query-string');
    const parsed = queryString.parse(location.search);
    const { id } = parsed;
    const allData = yield call(getInfoByID, id);
    yield put(initDarkMode(allData.darkmode));
    const { sites } = allData;
    const uriImage = yield select(imageURI);
    if (allData.headerImage) {
      yield put(setPrincipalImageID(allData.headerImage));

      const princImg = yield call(getImage, allData.headerImage);
      yield put(setImage(princImg.uri));
    }

    const uriList = yield all(sites.map((sito) => {
      const idU = sito.immagine;
      if (idU !== '') {
        const uri = call(getImage, idU);
        return uri;
      }
    }));

    const listURIImg = uriList.map((uri) => {
      if (uri) {
        return uri.uri;
      }
      return '';
    });
    if (uriImage.length === 0) {
      yield put(setURIList(listURIImg));
    }

    yield put(setSites(sites));
  } catch (error) {
    console.error('errore', error);
  }
}
