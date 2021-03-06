import React from 'react';
import moment from 'moment';
import './NewBill.scss';
import billsRequests from '../../../helpers/data/billsRequests';
import authRequests from '../../../helpers/data/authRequests';

const defaultBill = {
  cycleId: '',
  payee: '',
  amount: '',
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

  payeeChange = e => this.formFieldStringState('payee', e);

  amountChange = e => this.formFieldStringState('amount', e);

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
        this.props.history.push('/bills');
      }).catch(err => console.error(err));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myBill = { ...this.state.newBill };
    myBill.dueDate = Date.parse(`${this.state.billDueDate}T00:00:00`);
    myBill.amount = parseFloat(myBill.amount);
    myBill.uid = authRequests.getCurrentUid();
    const cycle = document.getElementById('cycle').value;
    if (cycle === 'monthly' || cycle === 'yearly') {
      myBill.cycleId = myBill.payee.replace(/ /g, '') + moment().format('MMDDYYYY');
    } else {
      myBill.cycleId = '-1';
    }
    this.repeatCycle(myBill);
    this.formSubmitEvent(myBill);
    this.setState({ newBill: defaultBill, billDueDate: defaultDueDate });
  }

  repeatCycle = (myBill) => {
    const occurances = document.getElementById('occurrences').value;
    const cycle = document.getElementById('cycle').value;
    let newDate;
    for (let i = 1; i <= occurances - 1; i += 1) {
      if (cycle === 'monthly') {
        newDate = Date.parse(moment(myBill.dueDate).add(i, 'months').calendar());
        const newBill = Object.assign({}, myBill);
        newBill.dueDate = newDate;
        this.formSubmitEvent(newBill);
      } else if (cycle === 'yearly') {
        newDate = Date.parse(moment(myBill.dueDate).add(i, 'years').calendar());
        const newBill = Object.assign({}, myBill);
        newBill.dueDate = newDate;
        this.formSubmitEvent(newBill);
      }
    }
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
      <div className="form-wrapper">
        <h5 className="text-center pb-3 new-bill-heading">Add New Bill</h5>
        <form onSubmit={this.formSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="form-label" htmlFor="payee">Payee:</label>
              <input
                type="text"
                className="form-control"
                id="payee"
                aria-describedby="payeeHelp"
                placeholder="West Wilson Utility"
                value= {newBill.payee}
                onChange= {this.payeeChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="form-label" htmlFor="dueDate">Due Date:</label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                value= {billDueDate}
                onChange = {this.dueDateChange}
                required
              />
            </div>
          </div>
        <div className="form-row">
            <div className="form-group col-md-6">
              <label className="form-label" htmlFor="amount">Amount :</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                aria-describedby="amountHelp"
                placeholder="25.45"
                value = {newBill.amount}
                onChange = {this.amountChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="form-label" htmlFor="url">Payment Url:</label>
              <input
                type="text"
                className="form-control"
                id="url"
                aria-describedby="urlHelp"
                placeholder="https://www.google.com/"
                pattern= "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                value={newBill.paymentUrl}
                onChange = {this.urlChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Category:</label>
            <select id="inputState" className="form-control" required value={newBill.category} onChange={this.categoryChange}>
              <option value=''>Select Category</option>
              <option>Utility</option>
              <option>Rent</option>
              <option>Mortgage</option>
              <option>Insurance</option>
              <option>Credit Cards</option>
              <option>TeleCommunication</option>
              <option>Tax</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="form-label" htmlFor="cycle">Cycle: </label>
              <select id="cycle" className="form-control" onChange={this.onChangeDisplayOccurances}>
                <option>Select Cycle</option>
                <option value="none">None</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="form-group col-md-6" id="showMe">
              <label className="form-label" htmlFor="noOfOccurances">No. of Occurrences: </label>
              <select id="occurrences" className="form-control">
                <option value="1">1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-success save-button mt-3"> <i className="fas fa-save pr-2"></i> Save Bill</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewBill;
