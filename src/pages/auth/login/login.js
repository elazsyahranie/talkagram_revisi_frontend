import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import style from "./login.module.css";
import { loginUser } from "../../../redux/action/auth";
import { connect } from "react-redux";

function Login(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrorMessage("");
  };

  const loginHandle = (event) => {
    event.preventDefault();
    props
      .loginUser({ ...form })
      .then((res) => {
        localStorage.setItem("token", res.value.data.data.token);
        props.history.push("/chat-list");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
      });
  };

  const goToSignUp = () => {
    props.history.push("/register");
  };

  return (
    <>
      <div className={style.greyBackground}>
        <Container>
          <Row>
            <div className={style.logIn}>
              <h4 className={`text-center my-5 ${style.logInHeader}`}>Login</h4>
              <Container>
                <h6 className="mb-4">Hi! Welcome back!</h6>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="userEmail"
                      onChange={(event) => handleForm(event)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="userPassword"
                      onChange={(event) => handleForm(event)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className={style.logInButton}
                    onClick={(event) => loginHandle(event)}
                  >
                    Submit
                  </Button>
                </Form>
                {errorMessage && (
                  <div className="my-4">
                    <Alert variant="danger">{errorMessage}</Alert>
                  </div>
                )}
                <h6 className="my-4 text-end">Forgot Password</h6>
                <h6 className="text-center my-4 fw-lighter">Login With</h6>
                <div className={style.logInWithGoogleButton}>
                  <h6 className={`${style.logInWithGoogleLink} text-center`}>
                    Google
                  </h6>
                </div>
                <h6 className="my-4 text-center">
                  Dont't have an account?{" "}
                  <span
                    className={style.signUpLinkStyling}
                    onClick={() => goToSignUp()}
                  >
                    Sign up!
                  </span>
                </h6>
              </Container>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
