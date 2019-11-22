import React, { Component } from "react";
import { Button, Container, Row, Col, Jumbotron, CardDeck, Card } from "react-bootstrap";

class Landing extends Component {
  render() {
    return (
      <Container>
        <Jumbotron style={{ marginTop: "4rem" }}>
        <h1>Note it</h1>
        <p>
          Take notes on the fly and share them with friends!
        </p>
        <p>
        <Button href="/register" style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }} 
             variant="dark">Register</Button>
            <Button href="/login" style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginLeft: "10px"
                }} 
            variant="light">Log In</Button>
        </p>
      </Jumbotron>
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>Write Notes Differently</Card.Title>
            <Card.Text>
              Painless, Fast and Easy to use editor right at the tips of your fingers
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Add Friends</Card.Title>
            <Card.Text>
              Want to share your notes with your Friends? You can do it!
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Comment on your Notes</Card.Title>
            <Card.Text>
              Get a sense of your Note taking skills by getting some feedback from your peers!
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      </Container>
    );
  }
}

export default Landing;