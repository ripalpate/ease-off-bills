import React from 'react';
import { Button } from 'reactstrap';
import './Bills.scss';

class Bills extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/bills/:${view}/edit`);
  }

  render() {
    return (
        <div className="Bill mx-auto" id="1234" to="/bills/:id/edit" onClick={this.changeView}>
        <Button className ="btn btn-info mt-5">Edit Bill</Button>
      </div>
    );
  }
}

export default Bills;
