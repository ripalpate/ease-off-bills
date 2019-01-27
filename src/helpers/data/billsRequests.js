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

const createBill = bill => axios.post(`${firebaseUrl}/bills.json`, bill);

const getSingleBill = billId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/bills/${billId}.json`)
    .then((result) => {
      const singleBill = result.data;
      singleBill.id = billId;
      resolve(singleBill);
    }).catch(err => reject(err));
});

const editBill = (billId, bill) => axios.put(`${firebaseUrl}/bills/${billId}.json`, bill);

const updatedIsPaid = (billId, isPaid) => axios.patch(`${firebaseUrl}/bills/${billId}.json`, { isPaid });

export default {
  getBills,
  deleteBill,
  createBill,
  getSingleBill,
  editBill,
  updatedIsPaid,
};
