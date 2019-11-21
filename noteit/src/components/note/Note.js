import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteNote } from "../../actions/noteActions";
import { logoutUser } from "../../actions/authActions";
import { createComment } from "../../actions/commentActions";
import { Button, Row, Form, Col, Card, ListGroup } from "react-bootstrap";
import Comment from "./Comment";

class Note extends Component {

    constructor(props) {
      super(props);

      this.state = {
        commentsNote: this.props.commentsNote
      }
    }

    onDeleteClick = (id) => {
        this.props.deleteNote(id);
    }

    componentDidUpdate(prevProps) {
      console.log(prevProps.comments.comment);
      if (this.props.comments.comment !== prevProps.comments.comment) {
        if (this.props.comments.comment.id === this.props.id)
          this.setState(prev => ({ commentsNote: [...prev.commentsNote, this.props.comments.comment.data] }))
      }
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    onSave = e => {
      e.preventDefault();
      
      const { user } = this.props.auth;

      const commentData = {
          user: user.id,
          comment: this.state.comment,
          likes: 0
      };
      this.setState({comment: ""});
      this.props.createComment(this.props.id,commentData);
  };

  render() {

    return (
    <div>
      <Card style={{ margin : "10px" }}>
          <Card.Header style={{ backgroundColor: "#212121" }}>
              <Row>
                  <Col md={9} style={{ color: "#ffffff" }}>
                      {this.props.name} - {this.props.date}
                  </Col>
                  <Col md={1}>
                      <Button href={"/note/" + this.props.id} variant="light" size="sm">Edit</Button>
                  </Col>
                  <Col md={1}>
                      <Button variant="light" size="sm" onClick={this.onDeleteClick.bind(this,this.props.id)}>Delete</Button>
                  </Col>
              </Row>
          </Card.Header>
          <Card.Body>
              <Card.Text>
              {this.props.description}
              </Card.Text>
          </Card.Body>
      </Card>
      <Row>
        <Col className="ml-auto" md={11}>
          <ListGroup variant="flush">
            {this.state.commentsNote.map(comment => (
              <ListGroup.Item>
                <Comment username={comment.user} comment={comment.comment}/>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col className="ml-auto" md={11}>
          <Form onSubmit={this.onSave.bind(this)}>
            <Form.Group>
            <Row>
            <Col md={10}>
                      <Form.Control id="comment" onChange={this.onChange} style={{ border: "none", borderBottom : "1px solid #dedede",fontWeight: "light" }} type="title" placeholder="Comment..."/>
                </Col>
                <Col md={1}>
                    <Button onClick={this.onSave.bind(this)} variant="light">Add</Button>
                </Col>
            </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
    );
  }
}

Note.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  comments: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comments: state.comments,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteNote, logoutUser, createComment }
)(Note);