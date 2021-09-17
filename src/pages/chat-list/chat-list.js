import { Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import style from "./chat-list.module.css";
import { connect } from "react-redux";

function ChatList(props) {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState("");

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setChatMessages({ ...chatMessage, dataMessage });
      });
    }
  }, [props.socket, chatMessages]);

  const handleChatMessage = (event) => {
    setChatMessage(event.target.value);
  };

  const { user_name } = props.auth.data;

  const submitChatMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log("Username:", user_name);
      console.log("Send message:", chatMessage);
      const setData = {
        user_name,
        chatMessage,
      };
      props.socket.emit("globalMessage", setData);
    }
  };

  return (
    <>
      <Container fluid className={style.wholeContainer}>
        <Row className={style.wholeRow}>
          <Col lg={3} md={3} sm={12} xs={12}>
            <h5>{user_name}</h5>
            <h5>User Two</h5>
          </Col>
          <Col lg={9} md={9} sm={12} xs={12} className={style.chatRoomStyling}>
            <h5>Chat room!</h5>
            <div className={style.chatMessagesContainer}>
              <p>
                <span className="fw-bold">The User:</span> Hi! How are you?
              </p>
            </div>
            <Form className={style.formChat}>
              <Form.Group>
                <Form.Control
                  type="text"
                  className={style.formChatControl}
                  value={chatMessage}
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
