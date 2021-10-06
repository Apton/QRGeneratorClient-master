import {
  all, takeLatest,
} from 'redux-saga/effects';
import { confirmDelete, confirmModify, setImage } from '../slice/adminSlice';
import getUserSites, {
  addDarkMode, delPrincipal, delSite, mod, setPrincipal, setSite,
} from './adminSagas';
import getSitesHome from './homeSagas';

/**
 * inizializzazione reparti
 */

function* actionWatcher() {
  yield takeLatest('INIT_ADMIN', getUserSites);
  yield takeLatest('ADD_SITE', setSite);
  yield takeLatest(confirmDelete.type, delSite);
  yield takeLatest(confirmModify.type, mod);
  yield takeLatest('GET_SITES_BY_ID', getSitesHome);
  yield takeLatest('CHANGE_MODE', addDarkMode);
  yield takeLatest(setImage.type, setPrincipal);
  yield takeLatest('DEL_PRINCIPAL_IMAGE', delPrincipal);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
