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

    // const paidBillStyle = {
    //   marginTop: '15px',
    //   backgroundColor: '#ffbb99',
    //   borderRadius: '15px',
    //   paddingBottom: '15px',
    // };

    const checkLength = () => {
      if (paidBills.length) {
        return (<h4 className="heading mb-3 pt-3 text-center">Paid Bills</h4>);
      }
      return (<span></span>);
    };

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
        {checkLength()}
        {paidBillsItemComponents}
      </div>
    );
  }
}

export default PaidBills;
