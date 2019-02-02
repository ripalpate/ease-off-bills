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

    // const checkLength = () => {
    //   const elem = document.getElementsByClassName('paid-bill')[0];
    //   console.log(elem);
    //   if (paidBills.length) {
    //     elem.style.display = 'block';
    //   } else {
    //     elem.style.display = 'none';
    //   }
    // };

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
       <div className="col paid-bill">
        {/* {checkLength()} */}
        <h4 className="paid-bill-heading">Paid Bill</h4>
        {paidBillsItemComponents}
      </div>
    );
  }
}

export default PaidBills;
