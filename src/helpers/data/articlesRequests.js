import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getArticles = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/articles.json`)
    .then((res) => {
      const articles = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          articles.push(res.data[key]);
        });
      }
      resolve(articles);
    })
    .catch(err => reject(err));
});

export default {
  getArticles,
};
