import { createSlice } from '@reduxjs/toolkit';

const dialogSlice = createSlice({
  name: 'dialog',
  initialState:
  {
    loginDialog: false,
    newSiteDialog: false,
    unsavedChangesDialog: false,

  },
  reducers: {
    openLoginDialog(state) {
      state.loginDialog = !state.loginDialog;
    },
    openNewSiteDialog(state) {
      state.newSiteDialog = !state.newSiteDialog;
    },
    openUnsavedChangesDialog(state, { payload }) {
      state.unsavedChangesDialog = !state.unsavedChangesDialog;
    },
  },
});
export const unsavedChangesDialog = (state) => state.dialog.unsavedChangesDialog;
export const newSiteDialog = (state) => state.dialog.newSiteDialog;
export const {
  openLoginDialog, openNewSiteDialog, openUnsavedChangesDialog,
} = dialogSlice.actions;
export default dialogSlice.reducer;
