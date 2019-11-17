import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from 'react-bootstrap';

class Navbar extends Component {
  render() {
    return (
    <Nav bg="dark" variant="dark">
        <Nav.Brand href="/">Noteit</Nav.Brand>
    </Nav>
    );
  }
}export default Navbar;