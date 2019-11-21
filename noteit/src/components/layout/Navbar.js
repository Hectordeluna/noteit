import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navbar as NavB, Nav, NavDropdown, Row, Col, Form, FormControl, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  render() {
    return (
    <NavB bg="dark" variant="dark">
        <NavB.Brand href="/">Noteit</NavB.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
        </Nav>
          <Nav>
          <NavDropdown drop="left" title={(<FaUserAlt/>)} id="dropdown">
            <NavDropdown.Item onClick={this.props.logoutUser}>Log out</NavDropdown.Item>
          </NavDropdown>
          </Nav>
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