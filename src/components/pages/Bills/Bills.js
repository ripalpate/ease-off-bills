import React from 'react';
import { Button } from 'reactstrap';
import './Bills.scss';
import Articles from '../../Articles/Articles';
import DueBills from '../../DueBills/DueBills';
import articlesRequests from '../../../helpers/data/articlesRequests';
import billsRequests from '../../../helpers/data/billsRequests';
import authRequests from '../../../helpers/data/authRequests';

class Bills extends React.Component {
  state = {
    articles: [],
    bills: [],
  }

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    articlesRequests.getArticles()
      .then((articles) => {
        this.setState({ articles });
      }).catch(err => console.error(err));

    billsRequests.getBills(uid)
      .then((bills) => {
        this.setState({ bills });
      }).catch(err => console.error(err));
  }

  changeView = () => {
    this.props.history.push('/bills/new');
  }

  render() {
    const { articles, bills } = this.state;
    return (
      <div className="">
        <div className="Bill mx-auto" onClick={this.changeView}>
          <Button className ="btn btn-info mt-5">Add Bills</Button>
        </div>
        <div className="row">
        <DueBills bills = {bills}/>
        <Articles articles = {articles}/>
        </div>
      </div>
    );
  }
}

export default Bills;
