import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import style from "./chat-list.module.css";
import { getContacts } from "../../redux/action/user";
import { connect } from "react-redux";

function ChatList(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages]);

  const { user_name, user_id } = props.auth.data;

  const handleChatMessage = (event) => {
    setMessage(event.target.value);
  };

  console.log(props);

  const submitChatMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const setData = {
        user_name,
        message,
      };
      props.socket.emit("globalMessage", setData);
      // props.socket.emit("privateMessage", setData);
      // props.socket.emit("broadcastMessage", setData);
      setMessage("");
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    props.history.push("/login");
  };

  return (
    <>
      <Container fluid className={style.wholeContainer}>
        <Row className={style.wholeRow}>
          <Col lg={3} md={3} sm={12} xs={12}>
            <h5>{user_name}</h5>
            <h5>User Two</h5>
            <Button variant="danger" onClick={() => handleLogOut()}>
              Log Out
            </Button>
          </Col>
          <Col lg={9} md={9} sm={12} xs={12} className={style.chatRoomStyling}>
            <h5>Chat room!</h5>
            <div className={style.chatMessagesContainer}>
              {messages.map((item, index) => (
                <p key={index}>
                  <strong>{item.user_name}: </strong> {item.message}
                </p>
              ))}
            </div>
            <Form className={style.formChat}>
              <Form.Group>
                <Form.Control
                  type="text"
                  className={style.formChatControl}
                  value={message}
                  onChange={(event) => handleChatMessage(event)}
                  onKeyDown={(event) => submitChatMessage(event)}
                />
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
  user: state.user,
});
const mapDispatchToProps = { getContacts };

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
