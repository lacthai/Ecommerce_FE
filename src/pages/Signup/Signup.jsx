import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../../services/appApi";
import { FcNews } from "react-icons/fc";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();


  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password });
  }

  return (
    <div className="container_form">
      <Container className="layout_form">
        <Row>
          <Col md={6} className="signup__form--container">
            <Form style={{ width: "75%" }} onSubmit={handleSignup}>
              <h2 className="login__title--logo"><FcNews /></h2>
              <h1 className="login__title-header">Create new account</h1>
              <p className="login__title-des">Start for free! Enjoy Shopping.</p>
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="login__input"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="login__input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="login__input"
                />
              </Form.Group>

              <Form.Group>
                <Button type="submit" 
                disabled={isLoading}
                style={{width: "100%", backgroundColor: "#111727", border: "none"}}
                >
                  Create account
                </Button>
              </Form.Group>
              <p className="pt-3 text-center" style={{color: "#7f828a", fontWeight: "500", marginBottom: "70px"}}>
                Already A Member? <Link to="/login" style={{textDecoration: "none", color: "#283135"}}>Login</Link>{" "}
              </p>
            </Form>
          </Col>
          <Col md={6} className="signup__image--container"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
