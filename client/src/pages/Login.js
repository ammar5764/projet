import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navigations from "../component/Navigations";
import { login } from "../services/authUsers";
// import { useForm } from "react-hook-form";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const redirectToProfil = () => {
    navigate("/profile");
  };

  const sendLoginToServer = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    if (state.email.length && state.password.length) {
      const result = await login(state.email, state.password)
        .then((res) => {
         
          console.log("data", res.data);
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            localStorage.setItem("tokenjwt", res.data.token);

            redirectToProfil();
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Welcome</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Form onSubmit={(e) => sendLoginToServer(e)}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          id="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          // {...register("exampleRequired", { required: true })}
                        />
                        {/* {errors.exampleRequired && <span style={{color:"red"}}>This field is required</span>} */}
                      </Form.Group>
                      <div className="email error"></div>
                      <br />
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          id="password"
                          placeholder="Password"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <div className="password error"></div>
                      <br />
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary fw-bold">
                          Sign Up
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
}
