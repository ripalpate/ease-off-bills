import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import googleButton from './image/login-google.png';
import './Auth.scss';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/bills');
    }).catch(err => console.error(err));
  }

  authenticateFacebookUser = (e) => {
    e.preventDefault();
    authRequests.facebookAuthenticate().then(() => {
      this.props.history.push('/bills');
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-default login-btn" onClick={this.authenticateUser}>
          <img src= {googleButton} alt="google login Button" width="400px"/>
        </button>
        <button className="btn btn-default login-btn" onClick={this.authenticateFacebookUser}>
          login
        </button>
      </div>
    );
  }
}

export default Auth;
