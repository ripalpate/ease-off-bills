import React from 'react';
import moment from 'moment';
import billsRequests from '../../../helpers/data/billsRequests';
import './EditBill.scss';
import authRequests from '../../../helpers/data/authRequests';

const defaultBill = {
  payee: '',
  amount: 0,
  category: '',
  paymentUrl: '',
  isPaid: false,
  uid: '',
};


class EditBill extends React.Component {
  state = {
    editId: '-1',
    editedBill: defaultBill,
    editedDueDate: 0,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempBill = { ...this.state.editedBill };
    tempBill[name] = e.target.value;
    this.setState({ editedBill: tempBill });
  }

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    const tempBill = { ...this.state.editedBill };
    tempBill[name] = e.target.value * 1;
    this.setState({ editedBill: tempBill });
  }

  payeeChange = e => this.formFieldStringState('payee', e);

  amountChange = e => this.formFieldNumberState('amount', e);

  categoryChange = e => this.formFieldStringState('category', e);

  urlChange = e => this.formFieldStringState('paymentUrl', e);

  dueDateChange = (e) => {
    e.preventDefault();
    let tempDate = { ...this.state.editedDueDate };
    tempDate = e.target.value;
    this.setState({ editedDueDate: tempDate });
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    billsRequests.getSingleBill(firebaseId)
      .then((bill) => {
        const editedDueDate = moment(bill.dueDate).format('YYYY-MM-DD');
        this.setState({ editedDueDate });
        this.setState({ editedBill: bill });
        this.setState({ editId: bill.id });
      }).catch(err => console.error(err));
  }

  formSubmitEvent = (editedBill) => {
    const { editId } = this.state;
    billsRequests.editBill(editId, editedBill)
      .then(() => {
        this.props.history.push('/bills');
      }).catch(err => console.error(err));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myBill = { ...this.state.editedBill };
    myBill.dueDate = Date.parse(`${this.state.editedDueDate}T00:00:00`);
    myBill.uid = authRequests.getCurrentUid();
    this.formSubmitEvent(myBill);
    this.setState({ editedBill: defaultBill });
  }

  render() {
    const { editedBill, editedDueDate } = this.state;
    return (
      <div>
        <h5>Edit your Bill</h5>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="payee">Payee:</label>
            <input
              type="text"
              className="form-control"
              id="payee"
              aria-describedby="payeeHelp"
              placeholder="West Wilson Utility"
              value= {editedBill.payee}
              onChange= {this.payeeChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value= {editedDueDate}
              onChange = {this.dueDateChange}
              required
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
              pattern= "^[1-9][0-9]*$"
              value = {editedBill.amount}
              onChange = {this.amountChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Category:</label>
            <select id="inputState" className="form-control" required value={editedBill.category} onChange={this.categoryChange}>
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
          <div className="form-group">
            <label htmlFor="url">Payment Url:</label>
            <input
              type="text"
              className="form-control"
              id="url"
              aria-describedby="urlHelp"
              placeholder="https://www.google.com"
              value={editedBill.paymentUrl}
              onChange = {this.urlChange}
              required
            />
          </div>
          <button className="btn btn-success">Save changes</button>
        </form>
      </div>
    );
  }
}

export default EditBill;
