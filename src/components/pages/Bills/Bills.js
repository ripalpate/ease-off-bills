import React from 'react';
import { Button } from 'reactstrap';
import './Bills.scss';
import Articles from '../../Articles/Articles';
import articlesRequests from '../../../helpers/data/articlesRequests';

class Bills extends React.Component {
  state = {
    articles: [],
  }

  componentDidMount() {
    articlesRequests.getArticles()
      .then((articles) => {
        this.setState({ articles });
      }).catch(err => console.error(err));
  }

  changeView = () => {
    this.props.history.push('/bills/new');
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="row">
        <div className="Bill mx-auto" onClick={this.changeView}>
          <Button className ="btn btn-info mt-5">Add Bills</Button>
        </div>
        <Articles articles = {articles}/>
      </div>
    );
  }
}

export default Bills;
