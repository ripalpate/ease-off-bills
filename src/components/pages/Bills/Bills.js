import React from 'react';
import { Button } from 'reactstrap';
import './Bills.scss';
import Articles from '../../Articles/Articles';
import DueBills from '../../DueBills/DueBills';
import PaidBills from '../../PaidBills/PaidBills';
import articlesRequests from '../../../helpers/data/articlesRequests';
import billsRequests from '../../../helpers/data/billsRequests';
import authRequests from '../../../helpers/data/authRequests';

class Bills extends React.Component {
  state = {
    articles: [],
    bills: [],
    paidBills: [],
    selectedBills: [],
  }

  categorySelection = (e) => {
    e.preventDefault();
    const selectedCategory = e.target.value;
    const { bills } = this.state;
    const selectedBills = [];
    if (!selectedCategory) {
      this.setState({ selectedBills: bills });
    } else {
      bills.forEach((bill) => {
        if (bill.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          selectedBills.push(bill);
        }
      });
      // console.log(selectedBills);
      this.setState({ selectedBills });
    }
  }

  getBills = () => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((billsArray) => {
        billsArray.sort((x, y) => x.dueDate - y.dueDate);
        const paidBills = billsArray.filter(x => x.isPaid === true);
        const bills = billsArray.filter(x => x.isPaid === false);
        this.setState({ paidBills, bills });
        this.setState({ selectedBills: bills });
      }).catch(err => console.error(err));
  }

  componentDidMount() {
    articlesRequests.getArticles()
      .then((articles) => {
        this.setState({ articles });
      }).catch(err => console.error(err));

    this.getBills();
  }

  deleteBill = (billId) => {
    billsRequests.deleteBill(billId)
      .then(() => {
        this.getBills();
      }).catch(err => console.error(err));
  }

  passBillToEdit = (billId) => {
    this.props.history.push(`/bills/${billId}/edit`);
  }

  updateIsPaid = (billId, isPaid) => {
    billsRequests.updatedIsPaid(billId, isPaid)
      .then(() => {
        this.getBills();
      }).catch(err => console.error(err));
  }

  changeView = () => {
    this.props.history.push('/bills/new');
  }

  render() {
    const {
      articles,
      bills,
      paidBills,
      selectedBills,
    } = this.state;

    return (
      <div className="bill-page">
        <div className="button-wrapper text-center row">
          <div className="category mt-5 mb-5 col-2">
            <select id="inputState" className="form-control" onChange={this.categorySelection}>
              <option value=''>All</option>
              <option value='utility'>Utility</option>
              <option value='rent'>Rent</option>
              <option>Mortgage</option>
              <option>Insurance</option>
              <option>Credit Cards</option>
              <option>TeleCommunication</option>
              <option>Tax</option>
              <option>Other</option>
            </select>
          </div>
          <Button className ="btn btn-info mt-5 mb-5 col-2" onClick={this.changeView}>Add Bills</Button>
        </div>
        <div className="row">
        <div className= "bills-components col-7">
          <DueBills
            bills = {selectedBills}
            deleteSingleBill = {this.deleteBill}
            passBillToEdit = {this.passBillToEdit}
            updateIsPaid = {this.updateIsPaid}
          />
           <PaidBills
          paidBills = {paidBills}
          deleteSingleBill = {this.deleteBill}
          updateIsPaid = {this.updateIsPaid}
          />
        </div>
        <Articles className="col-5" articles = {articles}/>
        </div>
      </div>
    );
  }
}

export default Bills;
