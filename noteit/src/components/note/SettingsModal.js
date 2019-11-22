import React, { Component } from "react";
import { Row, Form, Modal, Button, Col, Badge } from "react-bootstrap";
import { IoIosSettings } from "react-icons/io";

class SettingsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: this.props.tags,
        }
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onEnter = e => {
        e.preventDefault();
        this.setState(prev => ({ tags: [...prev.tags, this.state.tag] }))
        this.setState({tag: ""});
        
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({
                tags : prevProps.tags
            });
        }
    }

  render() {

    return (
        <Modal size="lg" show={this.props.show} onHide={() => this.props.onHide()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={this.onEnter.bind(this)}>
                <Form.Group as={Row}>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="Insert tags..." id="tag" onChange={this.onChange.bind(this)} />
                    
                    </Col>
                    <Col sm={2}>
                        <Button onClick={this.onEnter.bind(this)} variant="light">Add</Button>
                    </Col>
                </Form.Group>
                {this.state.tags.map(tag => (
                    <Badge variant="secondary" style={{ marginRight: "10px" }}>
                        {tag}
                    </Badge>
                ))}
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.onHide()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.props.saveSettings(this.state)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SettingsModal;