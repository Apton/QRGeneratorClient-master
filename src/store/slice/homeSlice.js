import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState:
  {

  },
  reducers: {

  },
});

export const getSitesByID = () => ({
  type: 'GET_SITES_BY_ID',
});

export const {
  openLoginDialog, openNewSiteDialog,
} = homeSlice.actions;
export default homeSlice.reducer;
