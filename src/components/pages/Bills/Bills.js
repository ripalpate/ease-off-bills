import React from 'react';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './Bills.scss';
import Articles from '../../Articles/Articles';
import DueBills from '../../DueBills/DueBills';
import PaidBills from '../../PaidBills/PaidBills';
import articlesRequests from '../../../helpers/data/articlesRequests';
import billsRequests from '../../../helpers/data/billsRequests';
import authRequests from '../../../helpers/data/authRequests';

class Bills extends React.Component {
  state = {
    articles: [],
    bills: [],
    paidBills: [],
    selectedBills: [],
    selectedArticles: [],
    dropdownOpen: false,
    dropDownValue: 'Select Category',
    // dropdownOpenArticle: false,
    // dropDownValueArticle: 'Select Category',
  }

  getBills = () => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((billsArray) => {
        billsArray.sort((x, y) => x.dueDate - y.dueDate);
        const paidBills = billsArray.filter(x => x.isPaid === true);
        const bills = billsArray.filter(x => x.isPaid === false);
        this.setState({ paidBills, bills });
        this.setState({ selectedBills: bills });
      }).catch(err => console.error(err));
  }

  componentDidMount() {
    articlesRequests.getArticles()
      .then((articles) => {
        this.setState({ articles });
        this.setState({ selectedArticles: articles });
      }).catch(err => console.error(err));

    this.getBills();
  }


  deleteBill = (billId) => {
    billsRequests.deleteBill(billId)
      .then(() => {
        this.getBills();
      }).catch(err => console.error(err));
  }

  deleteCycleBill = (cycleId) => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((bills) => {
        const filterDataByCycleId = bills.filter(x => x.cycleId === cycleId);
        filterDataByCycleId.forEach((bill) => {
          billsRequests.deleteCycleBill(bill.id)
            .then(() => {
              this.getBills();
            }).catch(err => console.error(err));
        });
      });
  }

  passBillToEdit = (billId) => {
    this.props.history.push(`/bills/${billId}/edit`);
  }

  updateIsPaid = (billId, isPaid) => {
    billsRequests.updatedIsPaid(billId, isPaid)
      .then(() => {
        this.getBills();
      }).catch(err => console.error(err));
  }

  changeView = () => {
    this.props.history.push('/bills/new');
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  // articletoggle() {
  //   this.setState({
  //     dropdownOpenArticle: !this.state.dropdownOpenArticle,
  //   });
  // }

  changeDropDownValue = (e) => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  }

  // changeArticleDropDownValue = (e) => {
  //   this.setState({ dropDownValueArticle: e.currentTarget.textContent });
  // }

  filteringArticles = (selectedCategory) => {
    const { articles } = this.state;
    const selectedArticles = [];
    if (!selectedCategory) {
      this.setState({ selectedArticles: articles });
    } else {
      articles.forEach((article) => {
        if (article.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          selectedArticles.push(article);
        }
      });
      this.setState({ selectedArticles });
    }
  }

  filteringBills = (selectedCategory) => {
    const { bills } = this.state;
    const selectedBills = [];
    if (!selectedCategory) {
      this.setState({ selectedBills: bills });
    } else {
      bills.forEach((bill) => {
        if (bill.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          selectedBills.push(bill);
        }
      });
      this.setState({ selectedBills });
    }
  }

  categorySelectionEvent = (e) => {
    e.preventDefault();
    const selectedCategory = e.target.value;
    this.filteringBills(selectedCategory);
    this.filteringArticles(selectedCategory);
  }

  // articleCategory = (e) => {
  //   e.preventDefault();
  //   const selectedCategory = e.target.value;
  //   this.filteringArticles(selectedCategory);
  // }

  render() {
    const {
      paidBills,
      selectedBills,
      selectedArticles,
      dropDownValue,
      dropdownOpen,
    } = this.state;

    const buttonAndHeading = () => (
      <div className="d-flex justify-content-between">
        <h4 className="heading pl-3"> Due Bills </h4>
        <div className="ml-auto">
          <Button className ="btn btn-success mr-3 add-button" onClick={this.changeView}>
            <i className="fas fa-plus-circle"></i>
          </Button>
        </div>
      </div>
    );

    return (
      <div className="bill-page">
        <div className="text-center mt-3 mb-3">
          <Dropdown className="dropdown" isOpen={dropdownOpen} toggle={e => this.toggle(e)}>
            <DropdownToggle caret>
              {dropDownValue}
            </DropdownToggle>
            <DropdownMenu onClick={this.categorySelectionEvent}>
              <DropdownItem value="" onClick={this.changeDropDownValue}>All</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="Utility">Utility</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="Rent">Rent</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="Mortgage">Mortgage</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="Insurance">Insurance</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="Credit Cards">Credit Cards</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="TeleCommunication">TeleCommunication</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="Tax">Tax</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="Other">Other</DropdownItem>
            </DropdownMenu>
            </Dropdown>
          </div>
        <div className="row">
          <div className= "bills-components col-lg-8 col-md-12">
          {buttonAndHeading()}
          <DueBills
            bills = {selectedBills}
            deleteCycleBill = {this.deleteCycleBill}
            passBillToEdit = {this.passBillToEdit}
            updateIsPaid = {this.updateIsPaid}
            deleteSingleBill = {this.deleteBill}
          />
          <PaidBills
              paidBills = {paidBills}
              deleteSingleBill = {this.deleteBill}
              updateIsPaid = {this.updateIsPaid}
          />
          </div>
          <div className="col-lg-4 col-md-12">
            <Articles articles = {selectedArticles}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Bills;
