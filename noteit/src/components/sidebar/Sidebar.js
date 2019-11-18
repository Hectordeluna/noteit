import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Container, Row, Col, Tab, Nav } from "react-bootstrap";
import Mynotes from "./../mynotes/Mynotes";

class Sidebar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    const { user } = this.props.auth;
    
    return (
        <Container style={{ boxShadow: "0px 0.2px 10px #9E9E9E", padding: "25px" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col md={3} style={{ borderRight:  "1px solid #dedede", height: "90vh"}}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">My Notes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Mynotes />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            Hola
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
      </Container>
    );
  }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Sidebar);