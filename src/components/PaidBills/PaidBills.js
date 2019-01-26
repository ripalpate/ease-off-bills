import React from 'react';
import PropTypes from 'prop-types';
import PaidBillItem from '../PaidBillItem/PaidBillItem';
import billShape from '../../helpers/propz/billShape';
import './PaidBills.scss';


class PaidBills extends React.Component {
  static propTypes = {
    paidBills: PropTypes.arrayOf(billShape),
    deleteSingleBill: PropTypes.func,
    passBillToEdit: PropTypes.func,
    updateIsPaid: PropTypes.func,
    isPaid: PropTypes.bool,
  }

  render() {
    const {
      paidBills,
      deleteSingleBill,
      passBillToEdit,
      updateIsPaid,
      isPaid,
    } = this.props;
    const paidBillsItemComponents = paidBills.map(paidBill => (
      <PaidBillItem
      paidBill={paidBill}
      key={paidBill.id}
      deleteSingleBill={deleteSingleBill}
      passBillToEdit={passBillToEdit}
      updateIsPaid={updateIsPaid}
      isPaid = {isPaid}
      />
    ));
    return (
       <div className="col">
        <h3>Paid Bill</h3>
        {paidBillsItemComponents}
      </div>
    );
  }
}

export default PaidBills;
