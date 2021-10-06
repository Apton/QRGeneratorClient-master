import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState:
  {
    id: '',
    idAuth: '',

  },
  reducers: {
    setID(state, { payload }) {
      state.id = payload;
    },
    setIDAuth(state, { payload }) {
      state.idAuth = payload;
    },
  },
});

export const addAccount = (payload) => ({
  type: 'ADD_ACCOUNT',
  payload,
});

export const id = (state) => state.login.id;
export const idAuth = (state) => state.login.idAuth;

export const {
  setID, setIDAuth,
} = loginSlice.actions;
export default loginSlice.reducer;
