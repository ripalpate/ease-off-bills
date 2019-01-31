import React from 'react';
import moment from 'moment';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import billsRequests from '../../../helpers/data/billsRequests';
import './SpendingGraph.scss';
import formatPrice from '../../../helpers/formatPrice';

const categories = ['Utility', 'Rent', 'Mortgage', 'Insurance', 'Credit Cards', 'TeleCommunication', 'Tax', 'Other'];
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#d30412', '#5a17b7', '#c9b280'];

class Graph extends React.Component {
  state = {
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

  componentDidMount() {
    this.getBills();
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
        const dataPoint = { name: c, value: totalSpending };
        chartData.push(dataPoint);
      }
    });
    this.setState({ chartData });
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
    const { chartData } = this.state;
    const listOfMonths = this.getLastMonths(6);
    const optionTemplate = () => listOfMonths.map(x => (
      <option key={x} value={x}>{x}</option>
    ));

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius,
      outerRadius, percent, index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline ="central">
{`${(percent * 100).toFixed(0)}%`}
    </text>
      );
    };

    return (
      <div className="spending-graph-container">
        <h4 className="text-center">Spending Graph</h4>
        <div className="text-center">
        <Form>
          <FormGroup>
            <Label for="exampleSelect">Select Month</Label>
            <Input type="select" name="select" id="select-months" onChange={this.selectMonth}>
            {optionTemplate()}
            </Input>
          </FormGroup>
        </Form>
        </div>
        <div>
          <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={chartData}
              dataKey='value'
              cx={300}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
            >{chartData.map((_entry, index) => <Cell key="1" fill={colors[index % colors.length]}/>)}
            </Pie>
            <Tooltip
              formatter={value => `${formatPrice(value)}`}
              labelFormatter = {value => `${formatPrice(value)}`}
              />
          </PieChart>
        </div>
      </div>
    );
  }
}

export default Graph;
