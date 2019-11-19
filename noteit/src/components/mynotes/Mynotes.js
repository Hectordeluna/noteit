import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotes } from "../../actions/noteActions";
import { Button, Container, Row, Col } from "react-bootstrap";
import Note from "./../note/Note"

class Mynotes extends Component {

    componentDidMount() {
        this.props.getNotes();
    }

  render() {
    const { notes } = this.props.note;

    return (
      <Container>
        <Row>
          <Col md={10}>
            <h1>My Notes</h1>
          </Col>
          <Col md={2}>
              <Button href="/note" variant="dark" style={{ verticalAlign : "middle" }}>New Note</Button>
          </Col>
        </Row>
        <Row style={{ borderTop : "1px solid #dedede" }}>
            {notes.map(note => (
                <Col key={note._id} md={12}>
                    <Note name={note.name} date="20/20/20" id={note._id} description={note.description}/>
                </Col>
            ))}
        </Row>
      </Container>
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