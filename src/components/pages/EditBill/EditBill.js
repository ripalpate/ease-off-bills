import React from 'react';
import './EditBill.scss';

class EditBill extends React.Component {
  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    console.log(firebaseId);
  }

  render() {
    return (
      <div>
        <h5>Edit your Bill</h5>
      </div>
    );
  }
}

export default EditBill;