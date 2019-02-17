import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  Nav,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;

    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className= "ml-auto navbar" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/bills/">Bills</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/bills/new">New Bill</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/bills/spending">Spending</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className= "ml-auto" navbar/>;
    };

    return (
      <div className="my-navbar">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/" className="logo-header">EaseOff Bills</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
