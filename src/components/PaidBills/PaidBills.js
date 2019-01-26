// import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import formatPrice from '../../helpers/formatPrice';
// import PaidBillItem from '../PaidBillItem/PaidBillItem';
// import billShape from '../../helpers/propz/billShape';
// import './PaidBills.scss';

// class PaidBills extends React.Component {
//   static propTypes = {
//     bill: billShape,
//     deleteSingleBill: PropTypes.func,
//     passBillToEdit: PropTypes.func,
//     updateIsPaid: PropTypes.func,
// isPaid: PropTypes.bool,
// }

// render() {
//   const {
//     bill,
//       deleteSingleBill,
//       passBillToEdit,
//       updateIsPaid,
//   isPaid,
// } = this.props;
//     const paidbillsItemComponents = bills.map(bill => (
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
//        <div className="col">
//          <h4>Paid Bills</h4>
//          <div className="row">
//            <p className="col-2">{moment(bill.dueDate).format('L')}</p>
//              <p className="col-2">{bill.category}</p>
//              <p className="col-2">{formatPrice(bill.amount)}</p>
//              <p className="col-1"><a href={bill.paymentUrl} rel="noopener noreferrer" target="_blank">Pay</a></p>
//              <span className="col-2">
//             <input className=""type="checkbox" value={isPaid} checked/>
//              <label className="checkbox-label">Paid</label></span>
//       </div>
//       </div>
//     );
//   }
// }

// export default PaidBills;
