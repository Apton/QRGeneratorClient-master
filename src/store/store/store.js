import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import login from '../slice/loginSlice';
import dialog from '../slice/dialogSlice';
import admin from '../slice/adminSlice';
import home from '../slice/homeSlice';
import load from '../slice/loadSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    login,
    dialog,
    admin,
    home,
    load,
  },

  middleware: [sagaMiddleware, logger],
  devTools: process.env.NODE_ENV !== 'production',

});
sagaMiddleware.run(rootSaga);
export default store;
