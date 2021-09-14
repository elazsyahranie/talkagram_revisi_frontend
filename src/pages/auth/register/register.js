import { Container, Row, Form, Image, Button } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "../../../redux/action/auth";
import { connect } from "react-redux";
import style from "./register.module.css";
import leftArrow from "../../components/back.png";

function Register(props) {
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandle = (event) => {
    event.preventDefault();
    console.log(form);
    props
      .registerUser({ ...form })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={style.greyBackground}>
        <Container>
          <Row>
            <div className={style.logIn}>
              <Container>
                <div className="my-5 d-flex justify-content-between align-items-center">
                  <Image src={leftArrow} alt="" />
                  <h4 className={`${style.logInHeader} my-auto`}>Register</h4>
                  <Image src={leftArrow} alt="" className={style.hiddenDot} />
                </div>
                <h6 className="mb-4">Hi! Welcome back!</h6>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      onChange={(event) => handleForm(event)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="userEmail"
                      onChange={(event) => handleForm(event)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="userPassword"
                      onChange={(event) => handleForm(event)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className={style.logInButton}
                    onClick={(event) => registerHandle(event)}
                  >
                    Submit
                  </Button>
                </Form>
                <h6 className="text-center my-4 fw-lighter">Register With</h6>
                <div className={style.logInWithGoogleButton}>
                  <h6 className={`${style.logInWithGoogleLink} text-center`}>
                    Google
                  </h6>
                </div>
                <h6 className="my-4 text-center">
                  Dont't have an account?{" "}
                  <span className={style.signUpLinkStyling}>Sign up!</span>
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
const mapDispatchToProps = { registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
