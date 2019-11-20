import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";



class Comment extends Component {

  render() {
    
    return (
        <Row style={{ height : "5vh", display: "flex", alignItems: "center" }}>
            <Col>
            <b>{this.props.username}</b>: {this.props.comment} 
            </Col>
        </Row>
    );
  }
}

export default Comment;