import { Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import style from "./chat-list.module.css";
import { connect } from "react-redux";

function ChatList(props) {
  const [chatMessage, setChatMessage] = useState("");

  const handleChatMessage = (event) => {
    setChatMessage({ [event.target.name]: event.target.value });
  };

  const submitChatMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log(chatMessage);
    }
  };

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
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="chatMessage"
                  onChange={(event) => handleChatMessage(event)}
                  onKeyDown={(event) => submitChatMessage(event)}
                ></Form.Control>
              </Form.Group>
            </Form>
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
