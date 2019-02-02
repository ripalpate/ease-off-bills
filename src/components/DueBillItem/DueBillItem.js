import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import billShape from '../../helpers/propz/billShape';
import formatPrice from '../../helpers/formatPrice';
import './DueBillItem.scss';

class DueBillItem extends React.Component {
  static propTypes = {
    bill: billShape,
    deleteCycleBill: PropTypes.func,
    passBillToEdit: PropTypes.func,
    updateIsPaid: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteCycleBill, bill } = this.props;
    deleteCycleBill(bill.cycleId);
  }

  deleteSingleEvent = (e) => {
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
    const deleteSeriesButton = () => {
      if (bill.cycleId === '-1') {
        return (<span className="col"></span>);
      }
      return (
        <button className="btn btn-danger mr-1 delete-button" title="Delete Series of Bill" onClick={this.deleteEvent}>
        <i className="fas fa-minus-circle"></i>
      </button>
      );
    };
    const dueBillElement = () => (
          <div className="row bill">
            <p className="col-sm pt-1">{moment(bill.dueDate).format('L')}</p>
            <p className="col-sm pt-1">{bill.category}</p>
            <p className="col-sm pt-1">{formatPrice(bill.amount)}</p>
            <p className="col-sm pt-1"><a href={bill.paymentUrl} rel="noopener noreferrer" target="_blank">Pay</a></p>
            <span className="col-sm pt-1">
            <input className="paid-checkbox" type="checkbox" checked={bill.isPaid} onChange={this.updateIsPaidEvent}/>
            <label className="checkbox-label">Paid</label></span>
            <span className="col">
              {deleteSeriesButton()}
              <button className="btn btn-danger delete-button" title="Delete Bill" onClick={this.deleteSingleEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
              <button className="btn btn-default edit-button" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
          </div>
    );

    return (
      <div>
        <div>
          {dueBillElement()}
        </div>
      </div>
    );
  }
}

export default DueBillItem;
