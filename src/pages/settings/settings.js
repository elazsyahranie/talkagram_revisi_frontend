import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import style from "./settings.module.css";
import noProfilePicture from "../components/img-not-found.png";
import leftArrow from "../components/back.png";

function Settings(props) {
  console.log(props.auth.data);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={3} md={3} sm={12} xs={12}>
            <div className="mt-5 d-flex justify-content-between">
              <div>
                <Image
                  src={leftArrow}
                  alt=""
                  className={style.shownDot}
                  fluid
                />
              </div>
              <h6 className={`text-center fw-bold ${style.userEmailStyling}`}>
                {props.auth.data.user_email}
              </h6>
              <Image src={leftArrow} alt="" className={style.hiddenDot} />
            </div>
            <div className="mt-5 d-flex justify-content-center">
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
