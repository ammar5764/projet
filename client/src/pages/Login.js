import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navigations from "../component/Navigations";
import { login } from "../services/authUsers";


export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  const redirectToLenders = () => {
    navigate("/profile", { replace: true });
  };
  const sendLoginToServer = async () => {
    if(state.email.length && state.password.length) {
      const result = await login(state.email,state.password);
      if(result.status === 200){
        console.log("token",)
        localStorage.token = result.data.token;
        
        redirectToLenders();
      }
      else{
        setMessage('error'); 
      }
    }
    else
    {
      setMessage('please enter valid userName and password')   
    } 
  }
  
  


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
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          id="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          id="password"
                          placeholder="Password"
                          onChange={handleChange}
                        />
                      </Form.Group>
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
                        <Button variant="primary" type="submit" onClick={sendLoginToServer}>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to='/register' className="text-primary fw-bold">
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

