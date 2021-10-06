import axios from 'axios';
import feathers from '@feathersjs/client';
import rest from '@feathersjs/rest-client';

// Connect to a different URL
const restClient = rest('https://dynamicqrcode.azurewebsites.net');
// const restClient = rest('http://localhost:3030');

// Configure an AJAX library (see below) with that client

const app = feathers();
app.configure(restClient.axios(axios));

// Connect to the service
const userSites = app.service('user-sites');
const up = app.service('uploads');

/**
 * Prende formulari senza etchetta
 */

export const getSites = (userID) => userSites.find({
  query: {
    userID,
  },
});

export const getInfoByID = (id) => userSites.get(id, {});

export const updateSites = (id, sitess, idA, dark, image) => userSites.update(
  id, {
    userID: idA, sites: sitess, darkmode: dark, headerImage: image,
  },
);

export const createNewAccount = (userID) => userSites.create({
  userID,
  sites: [],
});

export const uploadImage = (uri) => up.create({
  uri,
});

export const getImage = (id) => up.get(id, {});
