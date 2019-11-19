import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { createNote, getNote, editNote } from "../../actions/noteActions";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

class NoteEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name : "",
            description : "",
            username : "",
            _id : "",
            date : "",
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        if (id) {
            this.props.getNote(id);
        } 
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({
                name : prevProps.note.name,
                description : prevProps.description
            });
        }
 
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
      
    onSave = e => {
        e.preventDefault();
        
        let { id } = this.props.match.params;

        const noteData = {
            name: this.state.name,
            description: this.state.description,
            date: this.state.date,
            public: this.state.public,
        };

        if (!id) {
            const { user } = this.props.auth;
            noteData.username = user.id;
            this.props.createNote(noteData,this.props.history); 
        }  else {
            this.props.editNote(id,noteData);
        }  
    };

    render() {
        const { notes } = this.props.note;

        return (
        <Container>
            <Form>
            <Form.Group>
            <Row style={{ height : "10vh", display: "flex", alignItems: "center" }}>
                <Col md={10}>
                        <Form.Control id="name" onChange={this.onChange} defaultValue={notes.name} style={{ border: "none", fontWeight: "bold" }} type="title" placeholder="Title..."/>
                </Col>
                <Col style={{ display: "flex", alignItems: "center" }} md={2}>
                    <Button onClick={this.onSave.bind(this)}>Save</Button>
                </Col>
            </Row>
            <Row style={{ height : "100vh" }}>
                <Col style={{ boxShadow: "0px 0.2px 10px #9E9E9E", padding: "0px" }}>
                    <Form.Control id="description" onChange={this.onChange} defaultValue={notes.description} as="textarea" rows="50" />
                </Col>
            </Row>
            </Form.Group>
            </Form>
        </Container>
        );
    }
}

NoteEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    getNote: PropTypes.func.isRequired,
    note: PropTypes.object,
    auth: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    auth: state.auth,
    note: state.note
});
  
export default connect(
    mapStateToProps,
    { logoutUser, createNote, getNote, editNote }
)(withRouter(NoteEdit));