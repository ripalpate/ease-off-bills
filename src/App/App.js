import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import connection from '../helpers/data/connection';
import authRequests from '../helpers/data/authRequests';
import Auth from '../components/pages/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Bills from '../components/pages/Bills/Bills';
import NewBill from '../components/pages/NewBill/NewBill';
import EditBill from '../components/pages/EditBill/EditBill';

import './App.scss';
import Spending from '../components/pages/SpendingGraph/SpendingGraph';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props}/>)
    : (<Redirect to={{ pathname: '/bills', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props}/>)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

class App extends React.Component {
  state= {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const { authed, pendingUser } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
          <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
          <div className="appContainer">
            <div className="row">
              <Switch>
                <PrivateRoute exact path="/" component={Bills} authed={authed}/>
                <PrivateRoute exact path="/bills" component={Bills} authed={authed}/>
                <PrivateRoute exact path="/bills/new" component={NewBill} authed={authed}/>
                <PrivateRoute exact path="/bills/:id/edit" component={EditBill} authed={authed}/>
                <PrivateRoute exact path="/bills/spending" component={Spending} authed={authed}/>
                <PublicRoute path="/auth" component={Auth} authed={authed}/>
              </Switch>
            </div>
          </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
