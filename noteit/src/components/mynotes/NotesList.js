import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotes } from "../../actions/noteActions";
import { Button, Container, Row, Col, Form, FormControl } from "react-bootstrap";
import Note from "./../note/Note";
import searchService from './../../services/searchService';

class NotesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({
                notes : this.props.notes
            });
        }
 
    }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  searchAPI = async e => {
    e.preventDefault();
    this.setState({ notes : await searchService.getFriensNotes(this.state.searchValue)});
  }

  newNote () {
      if (this.props.title === "My Notes") {
          return (
            <Col md={4}>
            <Button href="/note" variant="dark" block style={{ verticalAlign : "middle" }}>New Note</Button>
            </Col>
          );
      } else {

        return (
        <Col md={4}><Form onSubmit={this.searchAPI.bind(this)}>
        <FormControl type="text" id="searchValue" placeholder="Search..." onChange={this.onChange.bind(this)}/>
        </Form></Col>);
      }
  }

  render() {
    const { notes } = this.state;

    return (
      <Container>
        <Row>
          <Col md={8}>
            <h1>{this.props.title}</h1>
          </Col>
            {this.newNote()}
        </Row>
        <Row style={{ borderTop : "1px solid #dedede" }}>
            {notes.length > 0 ? notes.map(note => (
              
                <Col key={note._id} md={12}>
                    <Note name={note.name} date={note.date.toString().split('T')[0]} id={note._id} description={note.description} commentsNote={note.comments} tags={note.tags} canEdit={note.canEdit} user={note.username.username}/>
                </Col>
              
            )) : (<p></p>)}
        </Row>
      </Container>
    );
  }
}

export default NotesList;