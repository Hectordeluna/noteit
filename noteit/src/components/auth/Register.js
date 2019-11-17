import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };this.props.registerUser(newUser, this.props.history); 
  };
  
  render() {
    const { errors } = this.state;return (
      <Container>
        <Row style={{ marginTop: "4rem" }} className="justify-content-md-center">
          <Col xs lg={6}>
            <Col>
                <Button href="/" variant="light">
                Back to home
                </Button>
            </Col>
            <Col md={12} style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </Col>
            <Form noValidate onSubmit={this.onSubmit}>
              <Col>
                <Form.Group controlId="formPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter password" 
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name
                    })}/>
                </Form.Group>
                <span className="red-text">{errors.name}</span>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter password" 
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}/>
                </Form.Group>
                <span className="red-text">{errors.email}</span>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" 
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                    invalid: errors.password
                    })}/>
                </Form.Group>
                <span className="red-text">{errors.password}</span>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}/>
                </Form.Group>
                <span className="red-text">{errors.password2}</span>
              </Col>
              <Col className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                 variant="dark">
                  Sign up
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));