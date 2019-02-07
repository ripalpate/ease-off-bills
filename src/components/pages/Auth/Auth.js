import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import googleButton from './image/google-login.png';
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
          <img src="https://www.myboost.com.my/wp-content/uploads/2018/08/paybills-banner2.png" width="250px" alt="important to pay bills"/>
          {/* <img src="https://pngimage.net/wp-content/uploads/2018/06/png-gas-payment-6.png" width="250px" alt="important to pay bills"/> */}
        </div>
        <div className="text-center mb-3">
          <img src="http://www.villageofjonescreektexas.com/yahoo_site_admin/assets/images/click-here-png-click-here-500.78134131_std.png" width="100px" alt="important to pay bills"/>
        </div>
        <div>
          <button className="btn login-btn" onClick={this.authenticateUser}>
            <img src= {googleButton} alt="google login Button" width="400px"/>
          </button>
        </div>
        <div>
        <button className="btn mt-5 login-btn" onClick={this.authenticateFacebookUser}>
          <img src= {facebookButton} alt="facebook login Button" width="400px"/>
        </button>
        </div>
      </div>
    );
  }
}

export default Auth;
