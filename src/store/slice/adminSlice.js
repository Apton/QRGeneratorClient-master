import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState:
  {
    sites: [],
    modify: '0',
    siteInfo: {
      id: '',
      titolo: '',
      descrizione: '',
      immagine: '',
      url: '',
    },
    del: '',
    imageURI: [],
    indexActive: '',
    darkmode: false,
    principalImageURI: '',
    principalImageID: '',

  },
  reducers: {
    setIndex(state, { payload }) {
      state.indexActive = payload;
    },
    setSites(state, { payload }) {
      state.sites = payload;
    },
    setModify(state, { payload }) {
      const {
        id, titolo, descrizione, immagine, url,
      } = payload;
      state.modify = id;
      state.siteInfo = {
        id,
        titolo,
        descrizione,
        immagine,
        url,
      };
    },
    setSiteInfo(state, { payload }) {
      const { value } = payload;
      const nome = payload.name;
      state.siteInfo[nome] = value;
    },
    resetSiteInfo(state) {
      state.siteInfo.id = '';
      state.siteInfo.titolo = '';
      state.siteInfo.descrizione = '';
      state.siteInfo.immagine = '';
      state.siteInfo.url = '';
    },
    setDelete(state, { payload }) {
      state.del = payload;
    },
    confirmDelete(state) {
      state.sites.splice(state.del, 1);
      state.imageURI.splice(state.del, 1);
    },
    confirmModify(state, { payload }) {
      state.sites.splice(payload, 1, state.siteInfo);
      state.modify = '0';
    },
    setImageURI(state, { payload }) {
      const { uri, index } = payload;
      if (index === -1) {
        state.imageURI.push(uri);
      } else {
        state.imageURI[index] = uri;
      }
    },

    setIDImage(state, { payload }) {
      const { idImage, index } = payload;
      state.sites[index].immagine = idImage;
    },

    setURIList(state, { payload }) {
      state.imageURI = payload;
    },
    setDarkMode(state) {
      state.darkmode = !state.darkmode;
    },

    initDarkMode(state, { payload }) {
      state.darkmode = payload;
    },

    setImage(state, { payload }) {
      state.principalImageURI = payload;
    },
    setPrincipalImageID(state, { payload }) {
      state.principalImageID = payload;
    },
    delImage(state) {
      state.principalImageURI = '';
    },
    delPrincipalImageID(state) {
      state.principalImageID = '';
    },
  },
});

export const initAdmin = (payload) => ({
  type: 'INIT_ADMIN',
  payload,
});

export const addSite = (payload) => ({
  type: 'ADD_SITE',
  payload,
});

export const changeMode = (payload) => ({
  type: 'CHANGE_MODE',
  payload,
});

export const delPrincipalImage = (payload) => ({
  type: 'DEL_PRINCIPAL_IMAGE',
  payload,
});

export const imageURI = (state) => state.admin.imageURI;
export const del = (state) => state.admin.del;
export const siteInfo = (state) => state.admin.siteInfo;
export const modify = (state) => state.admin.modify;
export const sites = (state) => state.admin.sites;
export const indexActive = (state) => state.admin.indexActive;
export const darkmode = (state) => state.admin.darkmode;
export const principalImageURI = (state) => state.admin.principalImageURI;
export const principalImageID = (state) => state.admin.principalImageID;
export const {
  setSites, setModify, setSiteInfo, resetSiteInfo, setDelete, confirmDelete,
  confirmModify, setImageURI, setIDImage, setURIList, setIndex, setDarkMode, initDarkMode,
  setImage, setPrincipalImageID, delImage, delPrincipalImageID,
} = adminSlice.actions;
export default adminSlice.reducer;
