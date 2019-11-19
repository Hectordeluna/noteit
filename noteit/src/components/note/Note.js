import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteNote } from "../../actions/noteActions";
import { Button, Row, Col, Card } from "react-bootstrap";

class Note extends Component {


    onDeleteClick = (id) => {
        this.props.deleteNote(id);
    }

  render() {
    
    return (
    <Card style={{ margin : "10px" }}>
        <Card.Header>
            <Row>
                <Col md={9}>
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
    );
  }
}

Note.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  note: state.note
});

export default connect(
  mapStateToProps,
  { deleteNote }
)(Note);