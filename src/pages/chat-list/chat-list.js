import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import style from "./chat-list.module.css";
import { getRooms } from "../../redux/action/user";
import { connect } from "react-redux";

function ChatList(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [noRooms, setNoRooms] = useState(false);
  const [room, setRoom] = useState({ new: "", previous: "" });

  const { user_name, user_id } = props.auth.data;

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }
    getDataofRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages]);

  const getDataofRooms = () => {
    props
      .getRooms(user_id)
      .then((res) => {
        setRooms(res.value.data.data);
        setNoRooms(false);
      })
      .catch(() => {
        setNoRooms(true);
      });
  };

  const handleChatMessage = (event) => {
    setMessage(event.target.value);
  };

  const selectRoom = (user_id) => {
    console.log(user_id);
    props.socket.emit("joinRoom", {
      room: user_id,
      previousRoom: room.previous,
      user_name,
    });
    setRoom({ ...room, new: user_id, old: user_id });
  };

  const submitChatMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const setData = {
        room: room.new,
        user_name,
        message,
      };
      // props.socket.emit("globalMessage", setData);
      // props.socket.emit("privateMessage", setData);
      // props.socket.emit("broadcastMessage", setData);
      props.socket.emit("roomMessage", setData);
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
          <Col lg={3} md={3} sm={12} xs={12}>
            <h5>{user_name}</h5>
            <h5>User Two</h5>
            <Button variant="danger" onClick={() => handleLogOut()}>
              Log Out
            </Button>
            {rooms
              ? rooms.map((item, index) => (
                  <>
                    <div
                      className="mb-3"
                      key={index}
                      onClick={() => selectRoom(item.room_chat)}
                      style={{ cursor: "pointer" }}
                    >
                      <h5 className="mb-2">{item.user_name}</h5>
                      <h6>{item.user_email}</h6>
                    </div>
                  </>
                ))
              : null}
            {noRooms && (
              <>
                <div className="mb-3">
                  <h6>Go to menu and find friends to chat with!</h6>
                </div>
              </>
            )}
            <Form className={style.roomChatSelect}>
              <Form.Control as="select" onChange={(event) => selectRoom(event)}>
                <option selected="selected" disabled hidden>
                  Choose a room...
                </option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
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
const mapDispatchToProps = { getRooms };

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
