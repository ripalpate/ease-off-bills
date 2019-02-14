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
      if (paidBills.length === 0) {
        return (<div className="no-bill-message">
        <h5 className="card-title text-center">Currently, There are no paid bills.</h5>
      </div>);
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
        <h4 className="heading mb-3 pt-3 text-center">Paid Bills</h4>
        <div>{checkLength()} </div>
        {paidBillsItemComponents}
      </div>
    );
  }
}

export default PaidBills;
