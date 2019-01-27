import React from 'react';
import PropTypes from 'prop-types';
import PaidBillItem from '../PaidBillItem/PaidBillItem';
import billShape from '../../helpers/propz/billShape';
import './PaidBills.scss';


class PaidBills extends React.Component {
  static propTypes = {
    paidBills: PropTypes.arrayOf(billShape),
    deleteSingleBill: PropTypes.func,
    updateIsPaid: PropTypes.func,
    isPaid: PropTypes.bool,
  }

  render() {
    const {
      paidBills,
      deleteSingleBill,
      updateIsPaid,
      isPaid,
    } = this.props;
    const paidBillsItemComponents = paidBills.map(paidBill => (
      <PaidBillItem
      paidBill={paidBill}
      key={paidBill.id}
      deleteSingleBill={deleteSingleBill}
      updateIsPaid={updateIsPaid}
      isPaid = {isPaid}
      />
    ));
    return (
       <div className="col">
        <h4>Paid Bill</h4>
        {paidBillsItemComponents}
      </div>
    );
  }
}

export default PaidBills;
