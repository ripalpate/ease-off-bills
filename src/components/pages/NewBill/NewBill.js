import React from 'react';
import './NewBill.scss';
import billsRequests from '../../../helpers/data/billsRequests';
import authRequests from '../../../helpers/data/authRequests';

const defaultBill = {
  payee: '',
  dueDate: '',
  amount: 0,
  category: '',
  paymentUrl: '',
  isPaid: false,
  uid: '',
};

class NewBill extends React.Component {
  state = {
    newBill: defaultBill,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempBill = { ...this.state.newBill };
    tempBill[name] = e.target.value;
    this.setState({ newBill: tempBill });
  }

  payeeChange = e => this.formFieldStringState('payee', e);

  dueDateChange = e => this.formFieldStringState('dueDate', e);

  amountChange = e => this.formFieldStringState('amount', e);

  categoryChange = e => this.formFieldStringState('category', e);

  urlChange = e => this.formFieldStringState('paymentUrl', e);

  formSubmitEvent = (newBill) => {
    billsRequests.createBill(newBill)
      .then(() => {
        this.props.history.push('/bills');
      }).catch(err => console.error(err));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myBill = { ...this.state.newBill };
    myBill.uid = authRequests.getCurrentUid();
    this.formSubmitEvent(myBill);
    this.setState({ newBill: defaultBill });
  }

  render() {
    const { newBill } = this.state;
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
              value= {newBill.dueDate}
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
              placeholder="50"
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
