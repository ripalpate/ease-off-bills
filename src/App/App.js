import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import Bills from '../components/Bills/Bills';

import './App.scss';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    if  (!this.state.authed) {
      return (
        <div className="App">
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <Bills/>
      </div>
    );
  }
}

export default App;
