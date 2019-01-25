import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import billShape from '../../helpers/propz/billShape';
import formatPrice from '../../helpers/formatPrice';
import './DueBillItem.scss';

class DueBillItem extends React.Component {
  static propTypes = {
    bill: billShape,
    deleteSingleBill: PropTypes.func,
    passBillToEdit: PropTypes.func,
    updateIsPaid: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleBill, bill } = this.props;
    deleteSingleBill(bill.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passBillToEdit, bill } = this.props;
    passBillToEdit(bill.id);
  }

  updateIsPaidEvent = (e) => {
    e.preventDefault();
    const { updateIsPaid, bill } = this.props;
    const isPaid = e.target.checked;
    updateIsPaid(bill.id, isPaid);
  }

  render() {
    const { bill } = this.props;
    console.log(bill);
    const dueBillElement = () => (
          <div className="row">
            <p className="col-2">{moment(bill.dueDate).format('L')}</p>
            <p className="col-2">{bill.category}</p>
            <p className="col-2">{formatPrice(bill.amount)}</p>
            <p className="col-1"><a href={bill.paymentUrl} rel="noopener noreferrer" target="_blank">Pay</a></p>
            <span className="col-2">
            <input className=""type="checkbox" checked={bill.isPaid} onChange={this.updateIsPaidEvent}/>
            <label className="checkbox-label">Paid</label></span>
            <span className="col-1">
              <button className="btn btn-danger delete-button" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
            <span className="col-1">
              <button className="btn btn-default edit-button" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
          </div>
    );
    return (
      <div>
        {dueBillElement()}
      </div>
    );
  }
}

export default DueBillItem;
