import React from 'react';
import {
  PieChart,
  Pie,
} from 'recharts';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import billsRequests from '../../../helpers/data/billsRequests';
import './SpendingGraph.scss';

const data = [{ category: 'Utility', value: 400 },
  { category: 'Rent', value: 300 },
  { category: 'Mortgage', value: 300 },
  { category: 'Insurance', value: 200 },
  { category: 'Tax', value: 278 },
  { category: 'Other', value: 189 },
];

class Spending extends React.Component {
  state = {
    dropdownOpen: false,
    dropDownValue: 'Select Category',
  }

  getChartData = () => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((billsArray) => {
        // do filter method  to match category and then inside do reduce to smash amount and return that array and set its state. 
        console.log(billsArray);
        const partialObject = billsArray.map(({ category, amount }) => ({ category, amount }));
        console.log(partialObject);
      });
  }

  componentDidMount() {
    this.getChartData();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  changeDropDownValue = (e) => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  }
  render() {
    return (
      <div>
        <div className="ml-3">
            <Dropdown className="mt-5 mb-5" isOpen={this.state.dropdownOpen} toggle={e => this.toggle(e)}>
            <DropdownToggle caret>
            {this.state.dropDownValue}
            </DropdownToggle>
            <DropdownMenu onClick={this.categorySelectionEvent}>
              <DropdownItem onClick={this.changeDropDownValue} value="January">January</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="February">February</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="March">March</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="April">April</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="May">May</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="June">June</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="July">July</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="August">August</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="September">September</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="October">OCtober</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="November">November</DropdownItem>
              <DropdownItem onClick={this.changeDropDownValue} value="December">December</DropdownItem>
            </DropdownMenu>
            </Dropdown>
          </div>
        <h4>Chart</h4>
        <PieChart width={800} height={400}>
        <Pie startAngle={360} endAngle={0} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
       </PieChart>
      </div>
    );
  }
}

export default Spending;
