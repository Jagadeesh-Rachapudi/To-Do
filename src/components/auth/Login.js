import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./auth.scss";
import Card from "react-bootstrap/Card";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(true);
  };

  return (
    <Card
      bg={"light".toLowerCase()}
      key={"Light"}
      text={"dark"}
      style={{ width: "35rem", minHeight: "28rem" }}
      className="mb-2"
    >
      <Card.Header>Login to make your day</Card.Header>
      <Card.Body>
        <Card.Text>
          <Container className="mt-3 mb-5">
            <Form onSubmit={handleSubmit}>
              <h1 className="mb-4">Login</h1>
              {showError && (
                <Alert variant="danger">Invalid email or password</Alert>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 mt-3 btn btn-light mb-1 auth-btn"
              >
                Login
              </Button>
            </Form>
          </Container>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Login;
