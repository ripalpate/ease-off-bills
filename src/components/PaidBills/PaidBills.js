// import React from 'react';
// import PropTypes from 'prop-types';
// import PaidBillItem from '../PaidBillItem/PaidBillItem';
// import billShape from '../../helpers/propz/billShape';
// import './PaidBills.scss';

// class PaidBills extends React.Component {
//   static propTypes = {
//     bills: PropTypes.arrayOf(billShape),
//     deleteSingleBill: PropTypes.func,
//     passBillToEdit: PropTypes.func,
//     updateIsPaid: PropTypes.func,
//     isPaid: PropTypes.bool,
//   }

//   render() {
//     const {
//       bills,
//       deleteSingleBill,
//       passBillToEdit,
//       updateIsPaid,
//       isPaid,
//     } = this.props;
//     const billsItemComponents = bills.map(bill => (
//       <PaidBillItem
//       bill={bill}
//       key={bill.id}
//       deleteSingleBill={deleteSingleBill}
//       passBillToEdit={passBillToEdit}
//       updateIsPaid={updateIsPaid}
//       isPaid = {isPaid}
//       />
//     ));

//     return (
//       <div className="col">
//         <h4>Paid Bills</h4>
//         {billsItemComponents}
//       </div>
//     );
//   }
// }

// export default PaidBills;
