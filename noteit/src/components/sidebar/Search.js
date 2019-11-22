import React, { Component, useEffect, useState } from "react";
import { Button, Container, Row, Col, Nav, InputGroup, DropdownButton, FormControl, Dropdown, Form } from "react-bootstrap";
import searchService from './../../services/searchService';
import Note from "./../note/Note"

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search : this.props.search,
            results : {notes : []}
        }
    }

    searchAPI = e => {
        this.props.onSubmit(e);
    }

    searchSet (e) {
        this.props.onChange(e.target.value);
    }

  render() {

    let { results } = this.props;

    if (!results) {
        results = [];
    }

    return (
      <Container>
        <Row>
          <Col md={12}>
                <h1>Search</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
                Results:
          </Col>
        </Row>
        <Row>
            {results.map(note => (
                <Col key={note._id} md={12}>
                    <Note name={note.name} date={note.date.toString().split('T')[0]} id={note._id} description={note.description} tags={note.tags} commentsDisable={true} canEdit={note.canEdit}/>
                </Col>
            ))}
        </Row>
      </Container>
    );
  }
}

export default Search;