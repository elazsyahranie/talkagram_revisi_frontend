import { Image, Form, Modal, Button, Alert } from "react-bootstrap";
import leftArrow from "../back.png";
import style from "./settings.module.css";
import noProfilePicture from "../img-not-found.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { changeUserData, changeUserPassword } from "../../../redux/action/user";
import { connect } from "react-redux";

function Settings(props) {
  // NAME
  const [showUserName, setShowUserName] = useState(true);
  const [showUserNameForm, setShowUserNameForm] = useState(false);

  const [userName, setUserName] = useState({ userName: "" });

  // PHONE
  const [showPhone, setShowPhone] = useState(true);
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  const [phone, setPhone] = useState({ userPhone: "" });

  // console.log(props.auth.data);

  // BIO
  const [showBio, setShowBio] = useState(true);
  const [showBioForm, setShowBioForm] = useState(false);

  const [bio, setBio] = useState({ userBio: "" });

  // PASSWORD
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [password, setPassword] = useState({
    userPassword: "",
    userNewPassword: "",
  });

  const [previousPasswordWrong, setPreviousPasswordWrong] = useState("");

  const handleClosePasswordModal = () => setShowChangePasswordModal(false);
  const handleShowPasswordModal = () => setShowChangePasswordModal(true);

  const displayUserNameForm = () => {
    setShowUserName(false);
    setShowUserNameForm(true);
  };

  const handleUserNameChange = (event) => {
    setUserName({ ...userName, [event.target.name]: event.target.value });
  };

  const submitUserName = (event) => {
    event.preventDefault();
    const data = {
      ...userName,
      userEmail: props.auth.data.user_email,
      userPhone: props.auth.data.user_phone,
      userBio: props.auth.data.user_bio,
    };
    props
      .changeUserData(data, props.auth.data.user_id)
      .then(() => {
        props.getUserData();
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(data);
    // console.log(props.auth.data.user_id);
  };

  const displayPhoneForm = () => {
    setShowPhone(false);
    setShowPhoneForm(true);
  };

  const handlePhoneChange = (event) => {
    setPhone({ ...phone, [event.target.name]: event.target.value });
  };

  const submitPhone = (event) => {
    event.preventDefault();
    const data = {
      userName: props.auth.data.user_name,
      userEmail: props.auth.data.user_email,
      ...phone,
      userBio: props.auth.data.user_bio,
    };
    props
      .changeUserData(data, props.auth.data.user_id)
      .then(() => {
        props.getUserData();
      })
      .then((err) => {
        console.log(err);
      });
  };

  const displayBioForm = () => {
    setShowBio(false);
    setShowBioForm(true);
  };

  const handleBioChange = (event) => {
    setBio({ ...bio, [event.target.name]: event.target.value });
  };

  const submitBioChange = (event) => {
    event.preventDefault();
    const data = {
      userName: props.auth.data.user_name,
      userEmail: props.auth.data.user_email,
      userPhone: props.auth.data.user_phone,
      ...bio,
    };
    props
      .changeUserData(data, props.auth.data.user_id)
      .then(() => {
        props.getUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
    setPreviousPasswordWrong("");
  };

  const submitNewPassword = (event) => {
    event.preventDefault();
    props
      .changeUserPassword(password, props.auth.data.user_id)
      .then(() => {
        props.getUserData();
      })
      .catch((err) => {
        setPreviousPasswordWrong(err.response.data.msg);
      });
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        show={showChangePasswordModal}
        dialogClassName={style.changePasswordModalStyling}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Change password</h4>
          <Form onSubmit={(event) => submitNewPassword(event)}>
            <Form.Group className="mb-2">
              <Form.Label>Previous Password</Form.Label>
              <Form.Control
                type="password"
                name="userPassword"
                onChange={(event) => handlePasswordChange(event)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="userNewPassword"
                onChange={(event) => handlePasswordChange(event)}
              />
            </Form.Group>
            <Button
              onClick={(event) => submitNewPassword(event)}
              className="mt-2 py-2 w-100"
            >
              Submit
            </Button>
            {previousPasswordWrong && (
              <div className="mt-2">
                <Alert
                  variant="danger"
                  className="d-flex justify-content-center"
                >
                  <span>{previousPasswordWrong}</span>
                </Alert>
              </div>
            )}
            <div
              className="d-flex justify-content-center mt-1"
              style={{ cursor: "pointer" }}
            >
              <small onClick={() => handleClosePasswordModal()}>
                <u>Close</u>
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <div>
        <div className="mt-4 d-flex justify-content-between">
          <div>
            <Image
              src={leftArrow}
              alt=""
              onClick={() => props.backToChat()}
              className={style.shownDot}
              fluid
            />
          </div>
          <h6 className={`text-center fw-bold ${style.userEmailStyling}`}>
            {props.auth.data.user_email}
          </h6>
          <Image src={leftArrow} alt="" className={style.hiddenDot} />
        </div>
        <div className="mt-4 d-flex justify-content-center">
          <Image
            src={noProfilePicture}
            alt=""
            className={style.profilePictureStyling}
            fluid
          />
        </div>
        {showUserName && (
          <div className="mt-4" onClick={() => displayUserNameForm()}>
            <h6 className="text-center">{props.auth.data.user_name}</h6>
          </div>
        )}
        {showUserNameForm && (
          <Form className="mt-4" onSubmit={(event) => submitUserName(event)}>
            <Form.Control
              type="text"
              className={style.smallerFormControl}
              name="userName"
              onChange={(event) => handleUserNameChange(event)}
            />
          </Form>
        )}
        <div className="mt-3">
          <h6 className="text-center">{props.auth.data.user_email}</h6>
        </div>
        <div className="mt-5 mb-4">
          <div className="mb-3">
            <h5 className="fw-bold">Account</h5>
          </div>
          {showPhone && (
            <div>
              <h6 onClick={() => displayPhoneForm()}>
                {props.auth.data.user_phone}
              </h6>
            </div>
          )}
          {showPhoneForm && (
            <Form onSubmit={(event) => submitPhone(event)}>
              <Form.Control
                type="text"
                className={style.smallerFormControl}
                name="userPhone"
                onChange={(event) => handlePhoneChange(event)}
              />
            </Form>
          )}
          <div>
            <small>Tap to change phone number</small>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="mt-4 mb-4">
        <h6>{props.auth.data.user_email}</h6>
        <h6 className="text-muted">User email</h6>
      </div>
      <hr></hr>
      <div className="mt-4 mb-4">
        {showBio && (
          <h6 className="fw-bold" onClick={() => displayBioForm()}>
            {props.auth.data.user_bio}
          </h6>
        )}
        {showBioForm && (
          <Form onSubmit={(event) => submitBioChange(event)}>
            <Form.Control
              type="text"
              className={style.smallerFormControl}
              name="userBio"
              onChange={(event) => handleBioChange(event)}
            />
          </Form>
        )}
        <h6 className="text-muted">Bio</h6>
      </div>
      <hr></hr>
      <div className="mt-4">
        <h5 className="fw-bold">Settings</h5>
        <div className="d-flex" onClick={() => handleShowPasswordModal()}>
          <FontAwesomeIcon icon={faLock} className={style.lowerIcons} />{" "}
          <h6>Change Password</h6>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon icon={faNewspaper} className={style.lowerIcons} />{" "}
          <h6
            onClick={() => props.handleLogOut()}
            style={{ cursor: "pointer" }}
          >
            Logout
          </h6>
        </div>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => ({
  user: state.user,
});

const mapDispatchtoProps = { changeUserData, changeUserPassword };

export default connect(mapStatetoProps, mapDispatchtoProps)(Settings);
