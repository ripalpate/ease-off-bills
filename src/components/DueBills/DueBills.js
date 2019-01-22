import React from 'react';
import PropTypes from 'prop-types';
import DueBillItem from '../DueBillItem/DueBillItem';
import billShape from '../../helpers/propz/billShape';
import './DueBills.scss';

class DueBills extends React.Component {
  static propTypes = {
    bills: PropTypes.arrayOf(billShape),
  }

  render() {
    const { bills } = this.props;
    const billsItemComponents = bills.map(bill => (
      <DueBillItem
      bill={bill}
      key={bill.id}
      />
    ));

    return (
      <div className="col">
        <h4>Due Bills</h4>
        {billsItemComponents}
      </div>
    );
  }
}

export default DueBills;
