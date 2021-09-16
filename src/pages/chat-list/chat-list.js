import { Container, Row, Col } from "react-bootstrap";
import style from "./chat-list.module.css";
import { connect } from "react-redux";

function ChatList(props) {
  console.log(props);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={3} md={3} sm={12} xs={12}>
            <h5>User One</h5>
            <h5>User Two</h5>
          </Col>
          <Col lg={9} md={9} sm={12} xs={12} className={style.chatRoomStyling}>
            <h5>Chat room!</h5>
            <input className={style.messageInput} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ChatList);
