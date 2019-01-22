import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getBills = uid => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/bills.json?orderBy="uid"&equalTo="${uid}"`)
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

const deleteBill = billId => axios.delete(`${firebaseUrl}/bills/${billId}.json`);

export default {
  getBills,
  deleteBill,
};
