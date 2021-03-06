import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import googleButton from './image/google-login-blue.png';
import facebookButton from './image/fb-sign-in-button.png';
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
    authRequests.authenticateFacebookUser().then(() => {
      this.props.history.push('/bills');
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <div className="Auth">
        <div className="text-center mb-3">
          <h4 className="heading-EaseOffBills position-relative animated infinite pulse">
          Welcome to
            <em>EaseOff</em>
            Bills</h4>
        </div>
        <div className="loginWrapper mt-5">
          <div className="googleButton text-center">
            <button className="btn login-btn" onClick={this.authenticateUser}>
              <img src= {googleButton} alt="google login Button" className="google"/>
            </button>
          </div>
          <div className="facebookButton text-center">
            <button className="btn login-btn" onClick={this.authenticateFacebookUser}>
              <img src= {facebookButton} alt="facebook login Button" className="facebook"/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
