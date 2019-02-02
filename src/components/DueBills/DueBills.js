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
        return (<h6 className="">Currently, There are no bills. Please add your Bill.</h6>);
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
        <h4>Due Bills</h4>
        <div>{checkLength()}</div>
        {dueBillsItemComponents}
      </div>
    );
  }
}

export default DueBills;
