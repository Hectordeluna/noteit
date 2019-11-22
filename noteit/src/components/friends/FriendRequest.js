import React, { Component } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import userService from "./../../services/userService";

class FriendRequest extends Component {

    constructor(props) {
        super();

        this.state = {
            hide: false
        }
    }

    async acceptRequest () {
        this.setState({hide : true});
        await userService.acceptRequest(this.props.id);   
    }

    async declineRequest () {
        this.setState({hide : true});
        await userService.declineRequest(this.props.id);
    }

    render() {
        if (this.state.hide) {
            return null;
        }
        return (
        <Card style={{ marginTop: "15px" }}>
            <Card.Body>
                <Card.Title>{this.props.username}</Card.Title>
                <Card.Text>
                Sent you a Friend Request!
                </Card.Text>
                <Button variant="primary" onClick={this.acceptRequest.bind(this)} style={{ marginRight: "10px" }}>Accept</Button>
                <Button variant="primary" onClick={this.declineRequest.bind(this)}>Decline</Button>
            </Card.Body>
        </Card>
        );
    }
}

export default FriendRequest;