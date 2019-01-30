import React from 'react';
import moment from 'moment';
import {
  PieChart,
  Pie,
} from 'recharts';
import {
  FormGroup,
  Label,
  Input,
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

// const defaultMonth = moment().format('MMMM YYYY');

class Spending extends React.Component {
  state = {
    dropdownOpen: false,
    // dropDownValue: defaultMonth,
  }

  selectValue = (e) => {
    const elem = e.currentTarget.value;
    console.log(elem);
  }

  getChartData = () => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((billsArray) => {
        // do filter method  to match category and then inside do reduce to smash amount and return that array and set its state.
        const dateArray1 = billsArray.map(x => moment(x.dueDate).format('MMMM YYYY'));

        const dateArray = billsArray.map(({ category, amount, dueDate }) => ({ category, amount, dueDate: moment(dueDate).format('MMMM YYYY') }));
        console.log(dateArray);

        const partialObject = billsArray.map(({ category, amount }) => ({ category, amount }));
        const elem = document.getElementById('select-months').value;
        console.log(elem);
        // const filterMonthObject = partialObject.filter(x => x.dueDate === Date.parse(elem));
        // console.log(filterMonthObject);
        // partialObject.forEach((item) => {
        const y = partialObject.filter(x => x.category === 'Utility');
        console.log(y);
        const initialValue = 0;
        const totalSpending = y.reduce((total, currentVal) => total + currentVal.amount, initialValue);
        console.log(totalSpending);
      });
  }

  componentDidMount() {
    this.getChartData();
  }

  getLastMonths = (n) => {
    const dropdownOption = [];
    dropdownOption.push(moment().format('MMMM YYYY'));
    for (let i = 1; i < 6; i += 1) {
      dropdownOption.push(moment().add(i * -1, 'Month').format('MMMM YYYY'));
    }
    return dropdownOption;
  }


  render() {
    const listOfMonths = this.getLastMonths(6);
    const optionTemplate = () => listOfMonths.map(x => (
      <option key={x} value={x}>{x}</option>
    ));
    return (
      <div>
        <div className="ml-3">
          <FormGroup>
            <Label for="exampleSelect">Select Month</Label>
            <Input type="select" name="select" id="select-months" onChange={this.selectValue}>
            {optionTemplate()}
            </Input>
          </FormGroup>
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
