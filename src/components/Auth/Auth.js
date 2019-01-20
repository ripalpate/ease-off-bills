import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import googleButton from './images/login-google.png';
import './Auth.scss';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.isAuthenticated();
    }).catch(err => console.error(err));
  }

  // authenticateFacebookUser = (e) => {
  //   e.preventDefault();
  //   authRequests.facebookAuthenticate().then((data) => {
  //     console.log(data);
  //   }).catch(err => console.error(err));
  // }

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
