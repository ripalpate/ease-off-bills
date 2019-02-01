import React from 'react';
import moment from 'moment';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Chart from '../../PieChart/PieChart';
import authRequests from '../../../helpers/data/authRequests';
import billsRequests from '../../../helpers/data/billsRequests';
import './SpendingGraph.scss';

const categories = ['Utility', 'Rent', 'Mortgage', 'Insurance', 'Credit Cards', 'TeleCommunication', 'Tax', 'Other'];

class Graph extends React.Component {
  state = {
    chartData: [],
    selectValue: '',
    selectedMonthData: [],
  }

  loadChartData = () => {
    const uid = authRequests.getCurrentUid();
    billsRequests.getBills(uid)
      .then((billsArray) => {
        const chartData = [];
        const currentMonth = moment().format('MMMM YYYY');
        const partialArray = billsArray.map(({ category, amount, dueDate }) => ({ category, amount, dueDate: moment(dueDate).format('MMMM YYYY') }));
        const filterDataByMonth = partialArray.filter(x => x.dueDate === currentMonth);
        categories.forEach((c) => {
          const sameCategory = filterDataByMonth.filter(x => x.category === c);
          const initialValue = 0;
          const totalSpending = sameCategory.reduce((total, currentVal) => total + currentVal.amount, initialValue);
          if (totalSpending > 0) {
            const dataPoint = { name: c, value: totalSpending };
            chartData.push(dataPoint);
          }
        });
        this.setState({ chartData, selectedMonthData: chartData });
      }).catch(err => console.error(err));
  }

  componentDidMount() {
    this.loadChartData();
  }

  filteringChartData = (selectedMonth) => {
    const { chartData } = this.state;
    const selectedMonthData = [];
    if (!selectedMonth) {
      this.setState({ selectedMonthData: chartData });
    } else {
      const uid = authRequests.getCurrentUid();
      billsRequests.getBills(uid)
        .then((billsArray) => {
          const partialArray = billsArray.map(({ category, amount, dueDate }) => ({ category, amount, dueDate: moment(dueDate).format('MMMM YYYY') }));
          const filterDataByMonth = partialArray.filter(x => x.dueDate === selectedMonth);
          categories.forEach((c) => {
            const sameCategory = filterDataByMonth.filter(x => x.category === c);
            const initialValue = 0;
            const totalSpending = sameCategory.reduce((total, currentVal) => total + currentVal.amount, initialValue);
            if (totalSpending > 0) {
              const dataPoint = { name: c, value: totalSpending };
              selectedMonthData.push(dataPoint);
            }
          });
          this.setState({ selectedMonthData });
        }).catch(err => console.error(err));
    }
  }

  selectEvent = (e) => {
    const selectedMonth = e.target.value;
    this.setState({ selectValue: e.currentTarget.value });
    this.filteringChartData(selectedMonth);
  }

  getLastMonths = (_n) => {
    const dropdownOption = [];
    dropdownOption.push(moment().format('MMMM YYYY'));
    for (let i = 1; i < 6; i += 1) {
      dropdownOption.push(moment().add(i * -1, 'Month').format('MMMM YYYY'));
    }
    return dropdownOption;
  }

  render() {
    const { selectedMonthData, selectValue } = this.state;
    const listOfMonths = this.getLastMonths(6);
    const optionTemplate = () => listOfMonths.map(x => (
      <option key={x} value={x}>{x}</option>
    ));


    return (
      <div className="spending-graph-container">
        <h4 className="text-center">Spending Graph</h4>
        <div className="text-center">
          <FormGroup>
            <Label for="exampleSelect">Select Month</Label>
            <Input type="select" name="select" id="select-months" value={selectValue} onChange= {this.selectEvent}>
            {optionTemplate()}
            </Input>
          </FormGroup>
        </div>
        <Chart selectedMonthData={selectedMonthData}/>
      </div>
    );
  }
}

export default Graph;
