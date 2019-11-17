import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

class Landing extends Component {
  render() {
    return (
      <Container>
        <Row style={{ marginTop: "4rem" }}  className="justify-content-md-center">
          <Col md={6}>
            <h2>
                Noteit
            </h2>
            <p className="flow-text grey-text text-darken-1">
              Create Notes and share them with friends!
            </p>
            <br />
            <Row className="justify-content-md-center">
            <Col sm>
              <Button href="/register" style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }} 
             variant="dark">Register</Button>
            </Col>
            <Col sm>
              <Button href="/login" style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }} 
                variant="light">Log In</Button>
            </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;