import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";//Navigate
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { createUser } from "../services/authUsers";
import Navigations from "../component/Navigations";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();//<Navigate to='login'/>
  const [message, setMessage] = useState("");
  // useEffect(() => {

  // }, []);

  const redirectToLenders = () => {
    navigate("/login", { replace: true });
  };

  const sendToServer = async () => {
    if (
      state.name.length &&
      state.username.length &&
      state.email.length &&
      state.password.length
    ) {
      const result = await createUser(
        state.name,
        state.username,
        state.email,
        state.password
      );
      console.log("result", result);
      redirectToLenders();

      setState((prevState) => ({
        ...prevState,
        name: "",
        username: "",
        email: "",
        password: "",
      }));
    } else {
      setMessage("error");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };
  return (
    <div>
      <Navigations />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Register
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          id="name"
                          placeholder="Enter Name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="username"
                          onChange={handleChange}
                          placeholder="Enter userame"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          id="email"
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          id="password"
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={sendToServer}
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div style={{ color: "red" }}>{message}</div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link to="/login" className="text-primary fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Register;
