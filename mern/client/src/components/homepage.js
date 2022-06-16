import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const quizzes = [
    { id: 1, name: "Horror"},
    { id: 2, name: "General"}
];
export default function Homepage(){
    return(
        <div>
            <h2 id="homeTitle">Choose Your Trivia!</h2>
            <Container>
                <Row md={4}>
                    {quizzes.map(quizzes => {
                        return(
                            <Col key={quizzes.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>Start {quizzes.name} Genre Quiz</Card.Title>
                                        <Card.Text>
                                            
                                        </Card.Text>
                                        <Button variant="primary">Start {quizzes.name}</Button>
                                    </Card.Body>
                                </Card>    
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}