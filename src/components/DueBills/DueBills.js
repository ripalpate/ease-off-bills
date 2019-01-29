import React from 'react';
import PropTypes from 'prop-types';
import DueBillItem from '../DueBillItem/DueBillItem';
import billShape from '../../helpers/propz/billShape';
import './DueBills.scss';

class DueBills extends React.Component {
  static propTypes = {
    bills: PropTypes.arrayOf(billShape),
    deleteSingleBill: PropTypes.func,
    passBillToEdit: PropTypes.func,
    updateIsPaid: PropTypes.func,
    isPaid: PropTypes.bool,
  }

  render() {
    const {
      bills,
      deleteSingleBill,
      passBillToEdit,
      updateIsPaid,
      isPaid,
    } = this.props;


    const dueBillsItemComponents = bills.map(bill => (
      <DueBillItem
      bill={bill}
      key={bill.id}
      deleteSingleBill={deleteSingleBill}
      passBillToEdit={passBillToEdit}
      updateIsPaid={updateIsPaid}
      isPaid = {isPaid}
      />
    ));

    return (
      <div className="col dueBills">
        <h4>Due Bills</h4>
        {dueBillsItemComponents}
      </div>
    );
  }
}

export default DueBills;
