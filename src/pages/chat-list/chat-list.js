import { Container, Row, Col } from "react-bootstrap";
import style from "./chat-list.module.css";

function ChatList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={3} md={3} sm={12} xs={12}>
            <h5>Chat lists!</h5>
          </Col>
          <Col lg={9} md={9} sm={12} xs={12} className={style.chatRoomStyling}>
            <h5>Chat room!</h5>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChatList;
