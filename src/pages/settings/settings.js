import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import style from "./settings.module.css";
import noProfilePicture from "../components/img-not-found.png";
import leftArrow from "../components/back.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faNewspaper } from "@fortawesome/free-solid-svg-icons";

function Settings(props) {
  const backToChat = () => {
    props.history.push("/chat-list");
  };

  // console.log(props.auth.data);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={3} md={3} sm={12} xs={12} className={style.leftMenu}>
            <Container>
              {/* ====== */}
              <div>
                <div className="mt-4 d-flex justify-content-between">
                  <div>
                    <Image
                      src={leftArrow}
                      alt=""
                      onClick={() => backToChat()}
                      className={style.shownDot}
                      fluid
                    />
                  </div>
                  <h6
                    className={`text-center fw-bold ${style.userEmailStyling}`}
                  >
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
                <div className="mt-4">
                  <h6 className="text-center">{props.auth.data.user_name}</h6>
                </div>
                <div className="mt-3">
                  <h6 className="text-center">{props.auth.data.user_email}</h6>
                </div>
                <div className="mt-5 mb-4">
                  <div className="mb-3">
                    <h5 className="fw-bold">Account</h5>
                  </div>
                  <div>
                    <h6>{props.auth.data.user_phone}</h6>
                  </div>
                  <div>
                    <small>Tap to change phone number</small>
                  </div>
                </div>
              </div>
              {/* ====== */}
              <hr></hr>
              {/* ====== */}
              <div className="mt-4 mb-4">
                <h6>{props.auth.data.user_email}</h6>
                <h6 className="text-muted">User email</h6>
              </div>
              {/* ====== */}
              <hr></hr>
              {/* ====== */}
              <div className="mt-4 mb-4">
                <h6 className="fw-bold">{props.auth.data.user_bio}</h6>
                <h6 className="text-muted">Bio</h6>
              </div>
              {/* ====== */}
              <hr></hr>
              {/* ====== */}
              <div className="mt-4">
                <h5 className="fw-bold">Settings</h5>
                <div className="d-flex">
                  <FontAwesomeIcon icon={faLock} className={style.lowerIcons} />{" "}
                  <h6>Change Password</h6>
                </div>
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    className={style.lowerIcons}
                  />{" "}
                  <h6>Logout</h6>
                </div>
              </div>
              {/* ====== */}
            </Container>
          </Col>
          <Col
            lg={9}
            md={9}
            sm={12}
            xs={12}
            className={style.chatRoomStyling}
          ></Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Settings);
