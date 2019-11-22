import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/profileActions";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import Friends from "./friends";

function dateToStr(date){
  if (date){
    return date.split('T')[0];
  }
}

class Myprofile extends Component {

  componentDidMount() {
    const {user} = this.props.auth;
    this.props.getUser(user.id);
  }

  render() {
    let {user} = this.props.profile;

    if (!this.props.profile.user){
      return(<Container/>);
    }
    
    return (
      <Container>
        <Row>
          <Col md={10}>
          <h1>{user.name}</h1>
          <h2 style={{color: 'rgb(80,80,80)'}}>{user.username}</h2>
          </Col>
        </Row>
        <Row style={{ borderTop : "1px solid #dedede", margin: '5px'}}> </Row>
        <ListGroup>
          <ListGroupItem>Email:  {user.email}</ListGroupItem>
          <ListGroupItem>Joined: {dateToStr(user.date)}</ListGroupItem>
        </ListGroup>
        <h3 style={{color: 'rgb(80,80,80)'}}>Friends</h3>
      </Container>
    );
  }
}

Myprofile.propTypes = {
    getUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
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
