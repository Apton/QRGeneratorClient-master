/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import {
  call, put, select, all,
} from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import {
  createNewAccount, getSites, updateSites, uploadImage, getImage,
} from '../api';
import { setID, id, idAuth } from '../slice/loginSlice';
import {
  setSites, siteInfo, sites, setSiteInfo, resetSiteInfo, setDelete, imageURI,
  setIDImage,
  setImageURI,
  setURIList,
  darkmode,
  initDarkMode,
  principalImageID,
  principalImageURI,
  setPrincipalImageID,
  setImage,
} from '../slice/adminSlice';
import { openNewSiteDialog } from '../slice/dialogSlice';
import {
  setLoading, setLoaded, setLoadingAdd, setLoadedAdd,
} from '../slice/loadSlice';

export default function* getUserSites() {
  try {
    const idUser = yield select(id);
    if (idUser === '') {
      yield put(setLoading());

      const idA = yield select(idAuth);
      if (idA !== '') {
        const allData = yield call(getSites, idA);

        const { data } = allData;
        if (data?.length === 0) {
          yield call(createNewAccount, idA);
        }
        const uriImage = yield select(imageURI);

        if (data?.length !== 0) {
          yield put(setPrincipalImageID(data[0].headerImage));

          const principalID = yield select(principalImageID);

          if (principalID !== '' && principalID !== undefined) {
            const uriPrincipal = yield call(getImage, principalID);

            yield put(setImage(uriPrincipal.uri));
          }

          yield put(initDarkMode(data[0]?.darkmode));
          const siti = data[0]?.sites;

          if (siti?.length !== 0) {
            const uriList = yield all(siti.map((sito) => {
              const idU = sito.immagine;
              if (idU !== '') {
                const uri = call(getImage, idU);
                return uri;
              }
            }));

            const listURIImg = uriList?.map((uri) => {
              if (uri) {
                return uri.uri;
              }
              return '';
            });
            if (uriImage?.length === 0) {
              yield put(setURIList(listURIImg));
            }

            yield put(setSites(siti));
          }

          if (allData.data[0]._id !== '') {
            yield put(setID(allData.data[0]._id));
          }
        }
      }
    }

    yield put(setLoaded());
  } catch (error) {
    console.error('errore', error);
  }
}

export function* setSite() {
  try {
    yield put(setLoadingAdd());
    const value = uuidv4();
    const idUs = yield select(id);
    const idA = yield select(idAuth);
    const info1 = yield select(siteInfo);
    const uri = info1.immagine;
    if (uri !== '') {
      const res = yield call(uploadImage, uri);
      const idImage = res.id;
      yield put(setSiteInfo({ name: 'immagine', value: idImage }));
    }
    yield put(setSiteInfo({ name: 'id', value }));

    const info = yield select(siteInfo);
    const listSites = yield select(sites);

    const sitess = [...listSites, info];
    const index = sitess.length - 1;
    const dark = yield select(darkmode);
    const image = yield select(principalImageID);

    yield put(setImageURI({ index, uri }));

    yield call(updateSites, idUs, sitess, idA, dark, image);
    yield put(setSites(sitess));
    yield put(openNewSiteDialog());
    yield put(resetSiteInfo());
    yield put(setLoadedAdd());
  } catch (error) {
    console.error('errore', error);
  }
}

export function* setPrincipal() {
  try {
    const sitess = yield select(sites);
    const dark = yield select(darkmode);

    const idUs = yield select(id);
    const idA = yield select(idAuth);
    const uri = yield select(principalImageURI);
    const res = yield call(uploadImage, uri);
    const idImage = res.id;
    yield put(setPrincipalImageID(idImage));
    const image = yield select(principalImageID);

    yield call(updateSites, idUs, sitess, idA, dark, image);
  } catch (error) {
    console.error('errore', error);
  }
}

export function* delPrincipal() {
  try {
    const sitess = yield select(sites);
    const dark = yield select(darkmode);

    const idUs = yield select(id);
    const idA = yield select(idAuth);
    const image = '';
    yield call(updateSites, idUs, sitess, idA, dark, image);
  } catch (error) {
    console.error('errore', error);
  }
}

export function* delSite() {
  try {
    const idUs = yield select(id);
    const idA = yield select(idAuth);
    const sitess = yield select(sites);

    const dark = yield select(darkmode);
    const image = yield select(principalImageID);

    yield call(updateSites, idUs, sitess, idA, dark, image);
    yield put(setDelete(''));
  } catch (error) {
    console.error('errore', error);
  }
}

export function* addDarkMode() {
  try {
    const dark = yield select(darkmode);
    const idUs = yield select(id);
    const idA = yield select(idAuth);
    const sitess = yield select(sites);
    const image = yield select(principalImageID);

    yield call(updateSites, idUs, sitess, idA, dark, image);
  } catch (error) {
    console.error('errore', error);
  }
}

export function* mod(action) {
  try {
    const idUs = yield select(id);
    const idA = yield select(idAuth);
    const uri = yield select(imageURI);
    const dark = yield select(darkmode);
    if (uri[action.payload]) {
      const res = yield call(uploadImage, uri[action.payload]);
      const index = action.payload;
      const idImage = res.id;
      yield put(setIDImage({ idImage, index }));
    }

    const sitess = yield select(sites);
    const image = yield select(setprincipalImageID);

    yield call(updateSites, idUs, sitess, idA, dark, image);
    yield put(setDelete(''));
  } catch (error) {
    console.error('errore', error);
  }
}
