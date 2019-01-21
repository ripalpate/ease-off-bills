import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getBills = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/bills.json`)
    .then((res) => {
      const bills = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          bills.push(res.data[key]);
        });
      }
      resolve(bills);
    })
    .catch(err => reject(err));
});

export default {
  getBills,
};
