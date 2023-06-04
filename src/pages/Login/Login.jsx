import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../services/appApi";
import "./Login.css";
import { FcShop } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }
  return (
    <div className="container_form">
      <Container className="layout_form">
        <Row>
          <Col md={6} className="login__form--container">
            <Form style={{ width: "75%" }} onSubmit={handleLogin}>
              <h2 className="login__title--logo"><FcShop /></h2>
              <h1 className="login__title-header">Welcome back</h1>
              <p className="login__title-des">Welcome back! Please enter your details.</p>
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
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
                  style={{borderRadius: "none"}}
                  className="login__input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Button type="submit" disabled={isLoading} style={{width: "100%", backgroundColor: "#111727", border: "none"}}>
                  Login
                </Button>
              </Form.Group>

              <p className="pt-3 text-center" style={{color: "#7f828a", fontWeight: "500",marginBottom: "70px"}}>
                Don't have an account? <Link to="/signup" style={{textDecoration: "none", color: "#283135"}}>Sign up for free</Link>{" "}
              </p>
            </Form>
          </Col>
          <Col className="login__image--container"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
