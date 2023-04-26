import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, name, password);
  };

  return (
    <Card
      bg={"light".toLowerCase()}
      key={"Light"}
      text={"dark"}
      style={{ width: "35rem", minHeight: "28rem" }}
      className="mb-2"
    >
      <Card.Body>
        <Card.Text>
          <Container className="mt-3 mb-5">
            <Form onSubmit={handleSubmit}>
              <h1 className="">Sign Up</h1>
              {showError && (
                <Alert variant="danger">Invalid email or password</Alert>
              )}
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  autocomplete="off"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter mail"
                  onChange={(e) => setEmail(e.target.value)}
                  autocomplete="off"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autocomplete="off"
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 mt-3 btn btn-light mb-1 auth-btn"
              >
                Sign Up
              </Button>
            </Form>
          </Container>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SignUp;
