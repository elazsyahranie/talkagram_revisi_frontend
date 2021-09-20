import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import style from "./chat-list.module.css";
import { getContacts } from "../../redux/action/user";
import { connect } from "react-redux";

function ChatList(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [noContacts, setNoContacts] = useState(false);

  const { user_name, user_id } = props.auth.data;

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }
    getDataofContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages]);

  const getDataofContacts = () => {
    props
      .getContacts(user_id)
      .then((res) => {
        setContacts(res.value.data.data);
        setNoContacts(false);
      })
      .catch(() => {
        setNoContacts(true);
      });
  };

  const handleChatMessage = (event) => {
    setMessage(event.target.value);
  };

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
      setMessage(""); // Mmebuat form kosong kembali setelah mengirimkan pesan
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    props.history.push("/login");
  };

  console.log(contacts);

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
            {contacts
              ? contacts.map((item, index) => (
                  <>
                    <div className="mb-3">
                      <h6 key={index}>{item.user_name}</h6>
                      <small className="text-muted" key={index}>
                        {item.user_email}
                      </small>
                    </div>
                  </>
                ))
              : null}
            {noContacts && (
              <>
                <div className="mb-3">
                  <h6>Add a friend to start chat</h6>
                </div>
              </>
            )}
            <Form className={style.roomChatSelect}>
              <Form.Control as="select">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Control>
            </Form>
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
