import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  Toast,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import style from "./chat-list.module.css";
import { getRooms, insertChat, chatHistory } from "../../redux/action/user";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function ChatList(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({ new: "", previous: "" });
  const [receiver, setReceiver] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState(false);
  const [notif, setNotif] = useState({
    show: false,
  });

  const { user_name, user_id } = props.auth.data;

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }
    getDataofRooms();
    // connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages]);

  const getDataofRooms = () => {
    props
      .getRooms(user_id)
      .then((res) => {
        setRooms(res.value.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const connect = () => {
    props.socket.on("message-notif", (data) => {
      setNotif(data);
    });
  };

  const getChatHistory = (room_chat) => {
    props
      .chatHistory(room_chat)
      .then((res) => {
        setChatHistory(res.value.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChatMessage = (event) => {
    setMessage(event.target.value);
  };

  const selectRoom = (room_chat, user_id) => {
    console.log(room_chat);
    console.log(user_id);
    setMessageInput(true);
    props.socket.emit("joinRoom", {
      room: room_chat,
      previousRoom: room.previous,
      user_name,
    });
    setRoom({ ...room, new: room_chat, old: room_chat });
    setReceiver(user_id);
    getChatHistory(room_chat);
  };

  const submitChatMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const setData = {
        room: room.new,
        user_name,
        message,
      };
      const data = {
        roomChat: room.new,
        senderId: user_id,
        receiverId: receiver,
        chatMessage: message,
        show: true,
      };
      props
        .insertChat(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // props.socket.emit("globalMessage", setData);
      // props.socket.emit("privateMessage", setData);
      // props.socket.emit("broadcastMessage", setData);
      props.socket.emit("roomMessage", setData);
      props.socket.emit("message-notif", data);
      setMessage(""); // Mmebuat form kosong kembali setelah mengirimkan pesan
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    props.history.push("/login");
  };

  // console.log(rooms);

  return (
    <>
      <Container fluid className={style.wholeContainer}>
        <Row className={style.wholeRow}>
          {/* <Toast
            onClose={() => setNotif({ ...notif, show: false })}
            className={style.notificationToast}
            show={true}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">
                New message from {notif.user_name}
              </strong>
              <strong className="text-muted">Check it out!</strong>
            </Toast.Header>
            <Toast.Body>{notif.message}</Toast.Body>
          </Toast> */}
          <Col lg={3} md={3} sm={12} xs={12}>
            <div className="my-4 d-flex justify-content-between">
              <h3 className={style.boldLogo}>Talkagram</h3>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="bg-white border-0 p-0"
                  id="dropdown-basic"
                >
                  <FontAwesomeIcon
                    icon={faBars}
                    className={style.showMenuIcon}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Button variant="danger" onClick={() => handleLogOut()}>
              Log Out
            </Button>
            {rooms.length > 0 ? (
              rooms.map((item, index) => (
                <>
                  <div
                    className="mb-3"
                    key={index}
                    onClick={() => selectRoom(item.room_chat, item.user_id)}
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className="mb-2">{item.user_name}</h5>
                    <h6>{item.user_email}</h6>
                  </div>
                </>
              ))
            ) : (
              <>
                <div>
                  <h6>Go to menu to find a friend to start chat with!</h6>
                </div>
              </>
            )}
          </Col>
          <Col lg={9} md={9} sm={12} xs={12} className={style.chatRoomStyling}>
            {messageInput && (
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
            )}
            <div
              className={
                !messageInput ? style.chooseChat : style.chooseChatHidden
              }
            >
              <p>Please select a chat to start messaging</p>
            </div>
            {chatHistory &&
              chatHistory.map((item, index) => (
                <>
                  <div key={index}>
                    <p>
                      <strong>{item.user_name}: </strong>
                      {item.message}
                    </p>
                  </div>
                </>
              ))}
            <div className={style.chatMessagesContainer}>
              <div className={style.chatMessagesInnerContainer}>
                {messages.map((item, index) => (
                  <p key={index}>
                    <strong>{item.user_name}: </strong> {item.message}
                  </p>
                ))}
              </div>
            </div>
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
const mapDispatchToProps = { getRooms, insertChat, chatHistory };

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
