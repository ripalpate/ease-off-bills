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
  }

  getBills = () => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((billsArray) => {
        billsArray.sort((x, y) => x.dueDate - y.dueDate);
        const paidBills = billsArray.filter(x => x.isPaid === true);
        const bills = billsArray.filter(x => x.isPaid === false);
        this.setState({ paidBills, bills });
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
    } = this.state;
    return (
      <div className="bill-page">
        <div className="button-wrapper text-center">
          <Button className ="btn btn-info mt-5 mb-5" onClick={this.changeView}>Add Bills</Button>
        </div>
        <div className="row">
        <div className= "bills-components col-7">
          <DueBills
            bills = {bills}
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
