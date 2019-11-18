import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Container, Row, Col } from "react-bootstrap";
import Note from "./../note/Note"

class Mynotes extends Component {

  render() {
    
    return (
      <Container>
        <Row>
          <Col md={10}>
            <h1>My Notes</h1>
          </Col>
          <Col md={2}>
              <Button variant="dark" style={{ verticalAlign : "middle" }}>New Note</Button>
          </Col>
        </Row>
        <Row style={{ borderTop : "1px solid #dedede" }}>
            <Col md={12}>
                <Note title="My Note Test" date="20/20/2010"/>
            </Col>
        </Row>
      </Container>
    );
  }
}

Mynotes.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Mynotes);