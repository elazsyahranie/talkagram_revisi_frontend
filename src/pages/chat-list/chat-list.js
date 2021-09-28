import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
  Toast,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import style from "./chat-list.module.css";
import { getRooms, insertChat, chatHistory } from "../../redux/action/user";
import { connect } from "react-redux";
import noProfilePicture from "../components/img-not-found.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCog,
  faUserFriends,
  faUsers,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

function ChatList(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({ new: "", previous: "" });
  const [receiver, setReceiver] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState(false);
  const [userOnline, setUserOnline] = useState([]);
  const [notif, setNotif] = useState({
    show: false,
  });

  // Modal
  const [showMenuModal, setShowMenuModal] = useState(false);

  const handleClose = () => setShowMenuModal(false);
  const handleShow = () => setShowMenuModal(true);

  const { user_name, user_id } = props.auth.data;

  const userId = props.auth.data.user_id;

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
      connect();
    }
    getDataofRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages, user_id]);

  const getDataofRooms = () => {
    console.log(user_id);
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
    props.socket.emit("connect-server", { userId });
    props.socket.on("list-users-online", (listUsersOnline) => {
      setUserOnline(listUsersOnline);
    });
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
    props.socket.emit("disconnect-server", { userId });
    localStorage.clear();
    props.history.push("/login");
  };

  console.log(userOnline);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        show={showMenuModal}
        dialogClassName={style.menuModalStyling}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Menu</h4>
          <div className="my-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faCog} />
            <h5 className="my-auto">Settings</h5>
          </div>
          <div className="my-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faUserFriends} />
            <h5 className="my-auto">Contacts</h5>
          </div>
          <div className="my-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faUsers} />
            <h5 className="my-auto">Add Friends</h5>
          </div>
          <div className="my-3">
            <Button onClick={() => handleClose()}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
      <Container fluid className={style.wholeContainer}>
        <Row className={style.wholeRow}>
          <Col lg={3} md={3} sm={12} xs={12}>
            <div className="my-4 d-flex justify-content-between">
              <h3 className={style.boldLogo}>Talkagram</h3>
              <FontAwesomeIcon
                icon={faBars}
                className={style.showMenuIcon}
                onClick={() => handleShow()}
              />
            </div>
            <Button variant="danger" onClick={() => handleLogOut()}>
              Log Out
            </Button>
            <div className="my-3">
              {rooms.length > 0 ? (
                rooms.map((item, index) => (
                  <>
                    <div
                      className="mb-3 d-flex"
                      key={index}
                      onClick={() => selectRoom(item.room_chat, item.user_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        <Image
                          src={noProfilePicture}
                          alt=""
                          className={style.profilePictureStyling}
                          fluid
                        />
                      </div>
                      <div className={style.roomUserStyling}>
                        <h5 className="mb-2">{item.user_name}</h5>
                        <h6 className="mt-2">{item.user_email}</h6>
                      </div>
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
            </div>
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
