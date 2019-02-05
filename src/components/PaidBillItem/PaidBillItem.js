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
  }

deleteEvent = (e) => {
  e.preventDefault();
  const { deleteSingleBill, paidBill } = this.props;
  deleteSingleBill(paidBill.id);
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
    <div className="row paidbill-item">
      <p className="col-sm pt-1">{moment(paidBill.dueDate).format('L')}</p>
      <p className="col-sm pt-1">{paidBill.category}</p>
      <p className="col-sm pt-1">{formatPrice(paidBill.amount)}</p>
      <span className="col-sm pt-1">
        <input className=""type="checkbox" checked={paidBill.isPaid} onChange={this.updateIsPaidEvent}/>
        <label className="checkbox-label">Paid</label></span>
      <span className="col">
        <button className="btn btn-danger delete-button" onClick={this.deleteEvent}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </span>
    </div>
  );
}
}

export default PaidBillItem;
