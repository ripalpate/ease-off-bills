import React from 'react';
import billShape from '../../helpers/propz/billShape';
import './DueBillItem.scss';

class DueBillItem extends React.Component {
  static propTypes = {
    bill: billShape,
  }

  render() {
    const { bill } = this.props;
    return (
      <div className="row">
        <p className="col-2">{bill.dueDate}</p>
        <p className="col-2">{bill.category}</p>
        <p className="col-2">{bill.amount}</p>
        <p className="col-2"><a href={bill.paymentUrl} rel="noopener noreferrer" target="_blank">Pay</a></p>
        <input className=""type="checkbox"/>
        <label className="checkbox-label">Paid</label>
      </div>
    );
  }
}

export default DueBillItem;
