import React from 'react';
import PropTypes from 'prop-types';
import DueBillItem from '../DueBillItem/DueBillItem';
import billShape from '../../helpers/propz/billShape';
import './DueBills.scss';

class DueBills extends React.Component {
  static propTypes = {
    bills: PropTypes.arrayOf(billShape),
    deleteCycleBill: PropTypes.func,
    passBillToEdit: PropTypes.func,
    updateIsPaid: PropTypes.func,
    isPaid: PropTypes.bool,
  }

  render() {
    const {
      bills,
      deleteCycleBill,
      deleteSingleBill,
      passBillToEdit,
      updateIsPaid,
      isPaid,
    } = this.props;

    const checkLength = () => {
      if (bills.length === 0) {
        return (
        <div className="no-bill-message">
          <h5 className="card-title text-center">Currently, There are no bills. Please add your Bills.</h5>
        </div>);
      }
      return (<span></span>);
    };

    const dueBillsItemComponents = bills.map(bill => (
      <DueBillItem
      bill={bill}
      key={bill.id}
      deleteCycleBill={deleteCycleBill}
      passBillToEdit={passBillToEdit}
      updateIsPaid={updateIsPaid}
      isPaid = {isPaid}
      deleteSingleBill = {deleteSingleBill}
      />
    ));

    return (
      <div className="col dueBills">
        <h4 className="heading mb-3">Due Bills</h4>
        <div>{checkLength()}</div>
        {dueBillsItemComponents}
      </div>
    );
  }
}

export default DueBills;
