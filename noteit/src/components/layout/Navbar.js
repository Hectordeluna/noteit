import React, { Component } from "react";
import { Navbar as NavB, Nav } from 'react-bootstrap';

class Navbar extends Component {
  render() {
    return (
    <NavB bg="dark" variant="dark">
        <NavB.Brand href="/">Noteit</NavB.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
        </Nav>
    </NavB>
    );
  }
}export default Navbar;