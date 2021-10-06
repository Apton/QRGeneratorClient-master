import { createSlice } from '@reduxjs/toolkit';

const loadSlice = createSlice({
  name: 'load',
  initialState:
  {
    loaded: false,
    loading: false,
    loadedAdd: false,
    loadingAdd: false,
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.loaded = false;
    },
    setLoaded(state) {
      state.loading = false;
      state.loaded = true;
    },
    setLoadingAdd(state) {
      state.loadingAdd = true;
      state.loadedAdd = false;
    },
    setLoadedAdd(state) {
      state.loadingAdd = false;
      state.loadedAdd = true;
    },

  },
});

export const loadingAdd = (state) => state.load.loadingAdd;
export const loadedAdd = (state) => state.load.loadedAdd;
export const loaded = (state) => state.load.loaded;
export const {
  setLoaded, setLoading, setLoadedAdd, setLoadingAdd,
} = loadSlice.actions;
export default loadSlice.reducer;
