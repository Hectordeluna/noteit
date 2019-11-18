import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

class Note extends Component {

  render() {
    
    return (
    <Card style={{ margin : "10px" }}>
        <Card.Header>
            <Row>
                <Col md={11}>
                    {this.props.title} - {this.props.date}
                </Col>
                <Col md={1}>
                    <Button variant="light" size="sm">Edit</Button>
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.            </Card.Text>
        </Card.Body>
    </Card>
    );
  }
}

Note.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Note);