import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import googleButton from './images/login-google.png';
import './Auth.scss';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {

    }).catch(err => console.error(err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-default login-button" onClick={this.authenticateUser}>
          <img src= {googleButton} alt="google-login-button" width="400px"/>
        </button>
      </div>
    );
  }
}

export default Auth;
