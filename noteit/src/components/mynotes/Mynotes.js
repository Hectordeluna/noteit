import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotes } from "../../actions/noteActions";
import { Button, Container, Row, Col } from "react-bootstrap";
import Note from "./../note/Note"
import NotesList from "./NotesList";

class Mynotes extends Component {

    componentDidMount() {
        this.props.getNotes();
    }

  render() {
    const { notes } = this.props.note;
    return (
     <NotesList notes={notes} title="My Notes"/>
    );
  }
}

Mynotes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    note: state.note
});

export default connect(
  mapStateToProps,
  { getNotes }
)(Mynotes);