import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import billShape from '../../helpers/propz/billShape';
import formatPrice from '../../helpers/formatPrice';
import './DueBillItem.scss';
import billReceipt from '../../images/bill-receipt.png';
import warning from '../../images/better-warning.png';

class DueBillItem extends React.Component {
  state = {
    modal: false,
    nestedModal: false,
    nestedModal1: false,
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
    });
  }

  toggleNested1() {
    this.uncheck();
    this.setState({
      nestedModal1: !this.state.nestedModal1,
    });
  }

  static propTypes = {
    bill: billShape,
    deleteCycleBill: PropTypes.func,
    passBillToEdit: PropTypes.func,
    updateIsPaid: PropTypes.func,
  }

  uncheck = () => {
    const checkElem = document.getElementById('checkbox');
    if (this.state.nestedModal1 === true) {
      checkElem.checked = false;
    }
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteCycleBill, bill } = this.props;
    deleteCycleBill(bill.cycleId);
  }

  deleteSingleEvent = (e) => {
    e.preventDefault();
    const { deleteSingleBill, bill } = this.props;
    deleteSingleBill(bill.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passBillToEdit, bill } = this.props;
    passBillToEdit(bill.id);
  }

  updateIsPaidEvent = (e) => {
    e.preventDefault();
    const { updateIsPaid, bill } = this.props;
    const isPaid = e.target.checked;
    updateIsPaid(bill.id, isPaid);
  }

  render() {
    const { modal, nestedModal, nestedModal1 } = this.state;
    const { bill } = this.props;
    const divStyleDanger = {
      backgroundColor: 'red',
    };
    const divStyleWarning = {
      backgroundColor: 'yellow',
    };
    const dueDays = () => {
      const billDueDate = bill.dueDate;
      const currentDate = moment();
      const days = moment(billDueDate).diff(currentDate, 'days', true);
      const actualNum = Math.ceil(days);
      if (actualNum === 0) {
        return (<small style={divStyleDanger}>Due Today</small>);
      } if (actualNum <= -1) {
        return (<small style={divStyleDanger}>Was due {actualNum} days ago</small>);
      } if (actualNum === 1) {
        return (
        <small style={divStyleWarning}>Due in {actualNum} day</small>
        );
      } if (actualNum > 0) {
        return (
        <small>Due in {actualNum} days</small>
        );
      }
      return (<small></small>);
    };

    const deleteSeriesButton = () => {
      if (bill.cycleId === '-1') {
        return (<span className="col"></span>);
      }
      return (
        <div>
          <Label onChange={e => this.toggleNested1(e)}>
              <Input id="checkbox" type="checkbox"/>{' '}
              Delete the Series of this bill
          </Label>
          <Modal className="animated rollIn" isOpen={nestedModal1} toggle={e => this.toggleNested1(e)}>
          <ModalBody className= "nestedModal">
            <div className="row">
              <div className="col-md-5 warning-image">
                <img src={warning} alt="warning-icon" width="150px"/>
              </div>
              <div className="col-md-7 pb-3">
                <p className="delete-text text-center">Are you sure </p>
                <p className="text-center">You want to Delete the whole series of {bill.category} bill?</p>
                <div className="text-center">
                  <Button className="nope-button mr-2" color="info" onClick={e => this.toggleNested1(e)}><i className="fas fa-ban mr-2"></i>Nope</Button>{' '}
                  <Button className="sure-button" color="danger" onClick={this.deleteEvent}><i className="fas fa-thumbs-up mr-2"></i>Sure</Button>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
      );
    };

    const deleteNestedModal = () => (
      <Modal className="animated rollIn" isOpen={nestedModal} toggle={e => this.toggleNested(e)}>
        <ModalBody className= "nestedModal">
          <div className="row">
            <div className="col-md-5 warning-image">
              <img src={warning} alt="warning-icon" width="150px"/>
            </div>
            <div className="col-md-7 pb-3">
              <p className="delete-text text-center">Are you sure</p>
              <p className="text-center">You want to Delete {bill.category} bill?</p>
              <div className="text-center">
                <Button className="nope-button mr-2" color="info" onClick={e => this.toggleNested(e)}><i className="fas fa-ban mr-2"></i>Nope</Button>{' '}
                <Button className="sure-button" color="danger" onClick={this.deleteSingleEvent}><i className="fas fa-thumbs-up mr-2"></i>Sure</Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );

    const modalElement = () => (
        <Modal isOpen={modal} toggle={e => this.toggle(e)} className="animated rollIn">
          <ModalHeader className="parentModal" toggle={e => this.toggle(e)}>Bill Details</ModalHeader>
          <ModalBody className="parentModal">
            <div className="row">
              <div className="col-md-7">
                <p className="col-sm pt-1 date-element">Due Date: {moment(bill.dueDate).format('L')}</p>
                <p className="col-sm pt-1">Payee: {bill.payee}</p>
                <p className="col-sm pt-1">Category: {bill.category}</p>
                <p className="col-sm pt-1">Amount: {formatPrice(bill.amount)}</p>
              </div>
              <div className="col-md-5">
                <img src={billReceipt} alt="detailBill" className="pt-2" width="150px"/>
              </div>
            </div>
            <div className="buttons text-center">
              <button className="btn btn-danger delete-button mr-3" title="Delete Bill" onClick={e => this.toggleNested(e)}>
                <i className="fas fa-trash-alt"></i>
              </button>
              {deleteNestedModal()}
              <button className="btn btn-secondary edit-button  ml-2" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
              <div className="pl-3 m-3">{deleteSeriesButton()}</div>
            </div>
          </ModalBody>
          <ModalFooter className="parentModal">
            <Button className="back-button" color="info" onClick={e => this.toggle(e)}>Take Me Back</Button>
          </ModalFooter>
        </Modal>
    );

    const dueBillElement = () => (
      <div className="duebill-item text-center mr-3 ml-3">
        <div className="row single-bill mb-1" onClick={e => this.toggle(e)}> {this.props.buttonLabel}
            <div className="col pt-1 date-element">{moment(bill.dueDate).format('L')}<p>{dueDays()}</p></div>
              <p className="col pt-1">{bill.category}</p>
              <p className="col pt-1">{formatPrice(bill.amount)}</p>
              <p className="col pt-1"><a href={bill.paymentUrl} rel="noopener noreferrer" target="_blank">Pay</a></p>
            <span className="col pt-1">
              <input className="paid-checkbox" type="checkbox" checked={bill.isPaid} onChange={this.updateIsPaidEvent}/>
              <label className="checkbox-label">Paid</label></span>
          </div>
          {modalElement()}
    </div>
    );

    return (
      <div>
        <div>
          {dueBillElement()}
        </div>
      </div>
    );
  }
}

export default DueBillItem;
