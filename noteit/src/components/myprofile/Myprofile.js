import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/profileActions";
import { Container, Row, Col } from "react-bootstrap";

class Myprofile extends Component {

  constructor(props){
    super(props);
    const {user} = this.props.auth;
  }

  componentDidMount() {
    const {user} = this.props.auth;
    this.props.getUser(user.id);
  }

  render() {
    const {user} = this.props.user;

    return (
      <Container>
        <Row>
          <Col md={10}>
          <h1>{user.name}</h1>
          <h2>{user.username}</h2>
          </Col>
        </Row>
        <Row style={{ borderTop : "1px solid #dedede" }}>
        </Row>
      </Container>
    );
  }
}

Myprofile.propTypes = {
    getUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { getUser }
  )(Myprofile);

  /*
  {friends.map(friend => (
      <Col key={friend._id} md={12}>
          <Friend />
      </Col>
  ))}
*/
