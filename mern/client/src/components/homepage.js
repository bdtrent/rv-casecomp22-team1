import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const quizzes = [
    { id: 1, name: "Horror"},
    { id: 2, name: "Rom-Com"}
];

export default function Homepage(){
    return(
        <div>
            <h2 id="homeTitle">Choose Your Trivia!</h2>
            <Container>
                <Row md={quizzes.length}>
                    {quizzes.map(quizzes => {
                        return(
                            <Col key={quizzes.id}>
                                <Card style={{ width: '18rem' }}>
                                <Card.Img class="cardCover" variant="top" src={"assets/"+quizzes.name+".png"} />
                                <Card.Body>
                                    <Card.Title>{quizzes.name} Trivia</Card.Title>
                                    <Card.Text>
                                   
                                    </Card.Text>
                                    <Link to="./quiz">
                                        <Button variant="primary">Start Quiz</Button>
                                    </Link>
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