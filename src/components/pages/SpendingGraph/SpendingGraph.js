import React from 'react';
import moment from 'moment';
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import billsRequests from '../../../helpers/data/billsRequests';
import './SpendingGraph.scss';
import formatPrice from '../../../helpers/formatPrice';

const categories = ['Utility', 'Rent', 'Mortgage', 'Insurance', 'Credit Cards', 'TeleCommunication', 'Tax', 'Other'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Spending extends React.Component {
  state = {
    dropdownOpen: false,
    billsArray: [],
    chartData: [],
  }

  getBills = () => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((billsArray) => {
        this.setState({ billsArray });
      }).catch(err => console.error(err));
  }

  selectMonth = (e) => {
    const chartData = [];
    e.preventDefault();
    const element = e.currentTarget.value;
    const { billsArray } = this.state;
    const partialArray = billsArray.map(({ category, amount, dueDate }) => ({ category, amount, dueDate: moment(dueDate).format('MMMM YYYY') }));
    const selectedData = partialArray.filter(x => x.dueDate === element);
    categories.forEach((c) => {
      const sameCategory = selectedData.filter(x => x.category === c);
      const initialValue = 0;
      const totalSpending = sameCategory.reduce((total, currentVal) => total + currentVal.amount, initialValue);
      if (totalSpending > 0) {
        const dataPoint = { category: c, value: totalSpending };
        chartData.push(dataPoint);
      }
    });
    this.setState({ chartData });
  }

  componentDidMount() {
    this.getBills();
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
    const { chartData } = this.state;
    const listOfMonths = this.getLastMonths(6);
    const optionTemplate = () => listOfMonths.map(x => (
      <option key={x} value={x}>{x}</option>
    ));
    return (
      <div>
        <div className="ml-3">
          <FormGroup>
            <Label for="exampleSelect">Select Month</Label>
            <Input type="select" name="select" id="select-months" onChange={this.selectMonth}>
            {optionTemplate()}
            </Input>
          </FormGroup>
        </div>
        <h4>Chart</h4>
        <PieChart width={800} height={400}>
        <Pie startAngle={360} endAngle={0} data={chartData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
        {
          chartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
       </PieChart>
      </div>
    );
  }
}

export default Spending;
