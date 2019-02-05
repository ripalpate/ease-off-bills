import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import chartDataShape from '../../helpers/propz/chartDataShape';
import formatPrice from '../../helpers/formatPrice';
import './PieChart.scss';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#d30412', '#5a17b7', '#c9b280'];

class Chart extends React.Component {
  static propTypes = {
    selectedMonthData: PropTypes.arrayOf(chartDataShape),
  }

  render() {
    const { selectedMonthData } = this.props;
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

    const checkLength = () => {
      if (selectedMonthData.length === 0) {
        return (<h6 className="text-center mt-5 no-chart-message">There are no bills for this month</h6>);
      } return (<small></small>);
    };

    return (
      <div className="pie-chart">
      {checkLength()}
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={selectedMonthData}
          dataKey='value'
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
        >{selectedMonthData.map((_entry, index) => <Cell key="1" fill={colors[index % colors.length]}/>)}
        </Pie>
        <Tooltip
          formatter={value => `${formatPrice(value)}`}
          labelFormatter = {value => `${formatPrice(value)}`}
          />
      </PieChart>
    </div>
    );
  }
}

export default Chart;
