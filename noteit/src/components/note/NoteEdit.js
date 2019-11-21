import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { createNote, getNote, editNote } from "../../actions/noteActions";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import SettingsModal from "./SettingsModal";
import { IoIosSettings } from "react-icons/io";

class NoteEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name : "",
            description : "",
            username : "",
            _id : "",
            date : Date.now(),
            public: false,
            showModal: false,
            tags: []
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
                name : prevProps.note.notes.name,
                description : prevProps.note.notes.description,
                public: prevProps.note.notes.public,
                date: prevProps.note.notes.date,
                tags: prevProps.note.notes.tags
            });
        }
 
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSwitch = e => {
        this.setState(prevState => ({ public: !prevState.public })); 
    }
      
    onSave = e => {
        e.preventDefault();
        this.saveNote();
    };

    saveNote () {
        let { id } = this.props.match.params;

        const noteData = {
            name: this.state.name,
            description: this.state.description,
            public: this.state.public,
            tags: this.state.tags,
        };

        if (!id) {
            const { user } = this.props.auth;
            noteData.username = user.id;
            noteData.canEdit = [user.id];
            noteData.date = new Date();
            this.props.createNote(noteData,this.props.history); 
        }  else {
            this.props.editNote(id,noteData);
        }  
    }

    saveSettings = settings => {
        this.setState({showModal: false});
        this.state.tags = settings.tags;
        this.saveNote();
    }

    onHide = () => {
        this.setState({showModal: false});
    }

    show = () => {
        this.setState({showModal: true});
    }

    render() {
        const { notes } = this.props.note;

        return (
        <Container>
            <Form>
            <Form.Group>
            <Row style={{ height : "10vh", display: "flex", alignItems: "center" }}>
                <Col md={1}>
                    <Button onClick={this.onSave.bind(this)}>Save</Button>
                </Col>
                <Col md={9}>
                        <Form.Control id="name" onChange={this.onChange} defaultValue={notes.name} style={{ border: "none", fontWeight: "bold" }} type="title" placeholder="Title..."/>
                </Col>
                <Col md={1}>
                    <Form.Check id="public" type="switch" onChange={this.onSwitch} label="Public" defaultChecked={notes.public}/>
                </Col>
                <Col md={1}>
                    <Button onClick={this.show.bind(this)} style={{ backgroundColor: "white", border: "0px" }}><IoIosSettings size={25} style={{ color: "grey" }}/></Button>
                </Col>
            </Row>
            <Row style={{ height : "100vh" }}>
                <Col style={{ boxShadow: "0px 0.2px 10px #9E9E9E", padding: "0px" }}>
                    <Form.Control id="description" onChange={this.onChange} defaultValue={notes.description} as="textarea" rows="50" />
                </Col>
            </Row>
            </Form.Group>
            </Form>
            <SettingsModal show={this.state.showModal} tags={notes.tags || []} saveSettings={this.saveSettings.bind(this)} onHide={this.onHide.bind(this)}/>
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