import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotes } from "../../actions/noteActions";
import { Button, Container, Row, Col, Tabs, Tab, Form, FormControl } from "react-bootstrap";
import FriendRequest from "./FriendRequest"
import searchService from "./../../services/searchService";
import FriendCard from "./FriendCard";

class FriendRequestLists extends Component {

    constructor(props) {
        super();

        this.state = {
            searchValue: ""
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    searchAPI = async e => {
        e.preventDefault();
        this.setState({ results : await searchService.findUsers(this.state.searchValue)});
    }

    Requests() {
        const { friendsRequests } = this.props;
        if (friendsRequests) {
            return (
                <Row>
                {friendsRequests.map(request => (
                    <Col key={request._id} md={12}>
                        <FriendRequest id={request._id} username={request.username}/>
                    </Col>
                ))}
            </Row>
            );
        }

        return (                
        <Row>
            <Col>
                Nothing Here! :(
            </Col>
        </Row>
        );
    }

    searchFriendsTab() {
        return (
            <Row style={{ marginTop: "20px" }}>
                <Col md={12}>
                    <Form onSubmit={this.searchAPI.bind(this)}>
                        <FormControl type="text" id="searchValue" placeholder="Search users..." onChange={this.onChange.bind(this)}/>
                    </Form>
                </Col>
            </Row>
        );
    }

    listUsers() {
        if (this.state.results) {
            return (
                <Row>
                {this.state.results.map(users => (
                    <Col key={users._id} md={12}>
                        <FriendCard username={users.username} id={users._id}/>
                    </Col>
                ))}
                </Row>
            );
        }

        return null;
    }

  render() {
    return (
      <Container>
        <Row>
          <Col md={10}>
            <h1>{this.props.title}</h1>
          </Col>
        </Row>
        <Tabs defaultActiveKey="requests" ied="uncontrolled-tab-example">
            <Tab eventKey="requests" title="Requests">
                {this.Requests()}
            </Tab>
            <Tab eventKey="search" title="Search Friends">
                {this.searchFriendsTab()}
                {this.listUsers()}
            </Tab>
            
        </Tabs>
      </Container>
    );
  }
}

export default FriendRequestLists;