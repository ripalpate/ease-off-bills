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
      <div className="">
        <div className="Bill mx-auto" onClick={this.changeView}>
          <Button className ="btn btn-info mt-5">Add Bills</Button>
        </div>
        <div className="row">
          <DueBills
            bills = {bills}
            deleteSingleBill = {this.deleteBill}
            passBillToEdit = {this.passBillToEdit}
            updateIsPaid = {this.updateIsPaid}
          />
          <Articles articles = {articles}/>
        </div>
        <div>
          <PaidBills
          paidBills = {paidBills}
          deleteSingleBill = {this.deleteBill}
          passBillToEdit = {this.passBillToEdit}
          updateIsPaid = {this.updateIsPaid}
          />
        </div>
      </div>
    );
  }
}

export default Bills;
