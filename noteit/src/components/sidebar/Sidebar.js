import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Container, Row, Col, Tab, Nav, Button, FormControl, Form } from "react-bootstrap";
import Mynotes from "./../mynotes/Mynotes";
import Myprofile from "./../myprofile/Myprofile";
import Search from "./Search";
import { Redirect } from "react-router-dom";
import searchService from './../../services/searchService';
import noteService from './../../services/noteService';
import NotesList from "./../mynotes/NotesList";
import FriendRequestLists from "./../friends/FriendRequestLists";

class Sidebar extends Component {

  constructor(props) {
    super();
    this.state = {
      searching : false,
      results: {notes: []},
      friendsNotes: [],
      friendsGetRequest: [],
      friendsRequests: [],
      resultNotes: [],
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onClick = e => {
    this.setState({currAct: e.target.eventKey});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSearchChange (val) {
    this.setState({ searchValue: val });
  };

  searchAPI = async e => {
    e.preventDefault();
    this.setState({currAct: "search"});
    this.setState({ results : await searchService.getAll(this.state.searchValue)});
  }

  friendsNotes = async e => {
    this.setState({ resultNotes : await noteService.getFriendsNotes()});
  }
  
  friendsGetRequest = async e => {
    this.setState({ friendsRequests : await searchService.getRequests()});
  }

  render() {
        
    return (
        <Container style={{ boxShadow: "0px 0.2px 10px #9E9E9E", padding: "25px" }}>
            <Tab.Container defaultActiveKey="first" activeKey={this.state.currAct}>
            <Row>
                <Col md={3} style={{ borderRight:  "1px solid #dedede", height: "90vh"}}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first" onClick={this.onClick.bind(this)}>My Notes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second" onClick={this.onClick.bind(this)}>Friends</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="third" onClick={this.onClick.bind(this)}>Friend Requests</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="fourth" onClick={this.onClick.bind(this)}>My Profile</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div style={{ borderBottom: "1px solid #dedede", marginBottom: "15px" }}></div>
                    <Form onSubmit={this.searchAPI.bind(this)}>
                    <FormControl type="text" id="searchValue" placeholder="Search..." onChange={this.onChange.bind(this)}/>
                    </Form>
                </Col>
                <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Mynotes />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second" onEnter={this.friendsNotes.bind(this)}>
                            <NotesList notes={this.state.resultNotes} title="Friends"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="search">
                            <Search results={this.state.results.notes} search={this.state.searchValue} onChange={this.onSearchChange.bind(this)} onSubmit={this.searchAPI.bind(this)}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third" onEnter={this.friendsGetRequest.bind(this)}>
                            <FriendRequestLists friendsRequests={this.state.friendsRequests} title="Friend Requests"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                            <Myprofile />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
      </Container>
    );
  }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Sidebar);