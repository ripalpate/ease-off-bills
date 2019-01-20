import React from 'react';
import { Button } from 'reactstrap';
import './Bills.scss';

class Bills extends React.Component {
  changeToEditView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/bills/:${view}/edit`);
  }

  changeView = () => {
    this.props.history.push('/bills/new');
  }

  render() {
    return (
      <div>
        <div className="Bill mx-auto" id="1234" to="/bills/:id/edit" onClick={this.changeToEditView}>
          <Button className ="btn btn-info mt-5">Edit Bill</Button>
        </div>
        <div className="Bill mx-auto" onClick={this.changeView}>
          <Button className ="btn btn-info mt-5">Add Bills</Button>
        </div>
      </div>
    );
  }
}

export default Bills;
