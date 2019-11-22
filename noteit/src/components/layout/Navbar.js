import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navbar as NavB, Nav, NavDropdown, Row, Col, Form, FormControl, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {

  constructor(props) {
    super(props);
    
    const {user} = this.props.auth;
    this.state = {
      currentUser: user.username
    }
  }

  profile () {
    const {user} = this.props.auth;

    if (!user.username) {
      return null;
    }

      return (
        <Nav>
        <NavDropdown drop="left" title={(<FaUserAlt/>)} id="dropdown">
          <NavDropdown.Item>{user.username}</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.props.logoutUser}>Log out</NavDropdown.Item>
        </NavDropdown>
        </Nav>
      );
    
  }

  render() {
    return (
    <NavB bg="dark" variant="dark">
        <NavB.Brand href="/">Noteit</NavB.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
        </Nav>
        {this.profile()}
    </NavB>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);