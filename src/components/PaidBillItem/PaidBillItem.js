import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import billShape from '../../helpers/propz/billShape';
import formatPrice from '../../helpers/formatPrice';
import './PaidBillItem.scss';

class PaidBillItem extends React.Component {
  static propTypes = {
    paidBill: billShape,
    deleteSingleBill: PropTypes.func,
    passBillToEdit: PropTypes.func,
    removeFromPaidComonent: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleBill, paidBill } = this.props;
    deleteSingleBill(paidBill.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passBillToEdit, paidBill } = this.props;
    passBillToEdit(paidBill.id);
  }

updateIsPaidEvent = (e) => {
  e.preventDefault();
  const { updateIsPaid, paidBill } = this.props;
  const isPaid = e.target.checked;
  updateIsPaid(paidBill.id, isPaid);
}


render() {
  const { paidBill } = this.props;

  return (
      <div className="row">
            <p className="col-2">{moment(paidBill.dueDate).format('L')}</p>
            <p className="col-2">{paidBill.category}</p>
            <p className="col-2">{formatPrice(paidBill.amount)}</p>
            <p className="col-1"><a href={paidBill.paymentUrl} rel="noopener noreferrer" target="_blank">Pay</a></p>
            <span className="col-2">
            <input className=""type="checkbox" checked={paidBill.isPaid} onChange={this.updateIsPaidEvent}/>
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
}
}

export default PaidBillItem;
