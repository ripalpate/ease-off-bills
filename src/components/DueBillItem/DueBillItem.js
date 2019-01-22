import React from 'react';
import billShape from '../../helpers/propz/billShape';
import formatPrice from '../../helpers/formatPrice';
import './DueBillItem.scss';

class DueBillItem extends React.Component {
  static propTypes = {
    bill: billShape,
  }

  render() {
    const { bill } = this.props;
    // const makeButtons = () => (
    //       <div>
    //         <span className="col">
    //           <button className="btn btn-default">
    //             <i className="fas fa-trash-alt"></i>
    //           </button>
    //         </span>
    //       </div>
    // );
    const dueBillElement = () => {
      if (!bill.isPaid) {
        return (
          <div className="row">
            <p className="col-2">{bill.dueDate}</p>
            <p className="col-2">{bill.category}</p>
            <p className="col-2">{formatPrice(bill.amount)}</p>
            <p className="col-1"><a href={bill.paymentUrl} rel="noopener noreferrer" target="_blank">Pay</a></p>
            <span className="col-2">
            <input className=""type="checkbox"/>
            <label className="checkbox-label">Paid</label></span>
            <span className="col-1">
              <button className="btn btn-danger delete-button">
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
            <span className="col-1">
              <button className="btn btn-default delete-button">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return (<span></span>);
    };
    return (
      <div>
        {dueBillElement()}
      </div>
    );
  }
}

export default DueBillItem;
