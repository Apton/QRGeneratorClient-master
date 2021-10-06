/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import '@fortawesome/fontawesome-pro/js/all';
import { ThemeProvider } from '@material-ui/core/styles';
import { Auth0Provider } from '@auth0/auth0-react';
import * as serviceWorker from './serviceWorker';
import Site from './view/Site/Site';
import Login from './view/Login/Login';
import store from './store/store/store';
import theme from './theme';
import Admin from './view/Admin/Admin';
import VerifyEmail from './view/VerifyEmail/VerifyEmail';

let classCounter = 0;

const generateClassName = () => {
  classCounter += 1;

  return `c${classCounter}`;
};

ReactDOM.render(
  <Auth0Provider
    domain="apton.eu.auth0.com"
    clientId="JwaViQ60t8qcobOX4NUGNan1sLMaeknL"
    redirectUri="https://dynamicqrcode.site/vemail"
  >
    <React.StrictMode>

      <ThemeProvider theme={theme}>

        <Provider store={store}>
          <StylesProvider generateClassName={generateClassName}>

            <CssBaseline />
            <Router basename={process.env.REACT_APP_BASENAME}>
              <Switch>
                <Route path="/home">
                  <Site />
                </Route>

                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/vemail">
                  <VerifyEmail />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>

            </Router>

          </StylesProvider>

        </Provider>
      </ThemeProvider>

    </React.StrictMode>
  </Auth0Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
