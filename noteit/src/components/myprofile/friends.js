import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

class Friends extends Component {

    constructor(props){
        super(props);
        
    }

    render() {
        const friends = this.props;
        if (typeof friends !== "undefined") {
            return (
                <ListGroup>
                    {friends.map(friend => (<ListGroupItem md={12}></ListGroupItem>))}
                </ListGroup>
            );
        }

        return (                
            <ListGroup>
                <ListGroupItem md={12}></ListGroupItem>
            </ListGroup>
        );
    }
}