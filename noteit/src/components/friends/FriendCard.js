import React, { Component } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import userService from "./../../services/userService";

class FriendCard extends Component {

  addFriend = () => {
    userService.sendRequest(this.props.id);
  }

  render() {
    return (
      <Card style={{ margin: "20px" }}>
        <Card.Body>
            <Card.Title>@{this.props.username}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" size="sm"block onClick={this.addFriend.bind(this)}>Add Friend</Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default FriendCard;