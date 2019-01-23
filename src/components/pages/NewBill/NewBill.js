import React from 'react';
import moment from 'moment';
import './NewBill.scss';
import billsRequests from '../../../helpers/data/billsRequests';
import authRequests from '../../../helpers/data/authRequests';

const defaultBill = {
  payee: '',
  amount: 0,
  category: '',
  paymentUrl: '',
  isPaid: false,
  uid: '',
};

const defaultDueDate = moment().format('YYYY-MM-DD');

class NewBill extends React.Component {
  state = {
    newBill: defaultBill,
    billDueDate: defaultDueDate,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempBill = { ...this.state.newBill };
    tempBill[name] = e.target.value;
    this.setState({ newBill: tempBill });
  }

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    const tempBill = { ...this.state.newBill };
    tempBill[name] = e.target.value * 1;
    this.setState({ newBill: tempBill });
  }

  payeeChange = e => this.formFieldStringState('payee', e);

  amountChange = e => this.formFieldNumberState('amount', e);

  categoryChange = e => this.formFieldStringState('category', e);

  urlChange = e => this.formFieldStringState('paymentUrl', e);

  dueDateChange = (e) => {
    e.preventDefault();
    let tempDate = { ...this.state.billDueDate };
    tempDate = e.target.value;
    this.setState({ billDueDate: tempDate });
  }

  formSubmitEvent = (newBill) => {
    billsRequests.createBill(newBill)
      .then(() => {
        billsRequests.getBills()
          .then((bills) => {
            this.setState({ bills });
            this.props.history.push('/bills');
          });
      }).catch(err => console.error(err));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myBill = { ...this.state.newBill };
    myBill.dueDate = Date.parse(`${this.state.billDueDate}T00:00:00`);
    myBill.uid = authRequests.getCurrentUid();
    const newDate = moment(myBill.dueDate).add(1, 'months').calendar();
    // for (let i = newDate; i < 5; i + 1) {
    //   newDate += i;
    //   console.log(newDate);
    // }
    console.log(newDate);
    this.formSubmitEvent(myBill);
    this.setState({ newBill: defaultBill, billDueDate: defaultDueDate });
  }

  onChangeDisplayOccurances = (e) => {
    const elem = document.getElementById('showMe');
    if (e.currentTarget.value === 'monthly' || e.currentTarget.value === 'yearly') {
      elem.style.display = 'block';
    } else {
      elem.style.display = 'none';
    }
  }

  render() {
    const { newBill, billDueDate } = this.state;
    return (
      <div>
        <h5>Add New Bill</h5>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="payee">Payee:</label>
            <input
              type="text"
              className="form-control"
              id="payee"
              aria-describedby="payeeHelp"
              placeholder="West Wilson Utility"
              value= {newBill.payee}
              onChange= {this.payeeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value= {billDueDate}
              onChange = {this.dueDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount :</label>
            <input
              type="text"
              className="form-control"
              id="amount"
              aria-describedby="amountHelp"
              placeholder="0"
              value = {newBill.amount}
              onChange = {this.amountChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Category:</label>
            <select id="inputState" className="form-control" value={newBill.category} onChange={this.categoryChange}>
              <option>Select Category</option>
              <option>Utility</option>
              <option>Rent</option>
              <option>Mortgage</option>
              <option>Insurance</option>
              <option>Credit Cards</option>
              <option>TeleCommunication</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cycle">Cycle: </label>
            <select id="cycle" className="form-control" onChange={this.onChangeDisplayOccurances}>
              <option>Select Cycle</option>
              <option value="none">None</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="form-group" id="showMe">
            <label htmlFor="noOfOccurances">No. of Ocuurances: </label>
            <select id="occurances"className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="url">Payment Url:</label>
            <input
              type="text"
              className="form-control"
              id="url"
              aria-describedby="urlHelp"
              placeholder="www.google.com"
              value={newBill.paymentUrl}
              onChange = {this.urlChange}
            />
          </div>
          <button className="btn btn-success">Save Bill</button>
        </form>
      </div>
    );
  }
}

export default NewBill;
