import {
  Container,
  Collapse,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
  Toast,
} from "react-bootstrap";
import "animate.css";
import { useState, useEffect } from "react";
import style from "./chat-list.module.css";
import {
  getRooms,
  insertChat,
  chatHistory,
  getFriendRequest,
  getPendingRequest,
  getContactsDataOnly,
} from "../../redux/action/user";
import { getUserbyId } from "../../redux/action/auth";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faBars,
  faCog,
  faUserFriends,
  faUsers,
  faPencilAlt,
  faTrashAlt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

// IMAGES
import noProfilePicture from "../components/img-not-found.png";

// COMPONENTS
import MobileMenu from "../components/MobileMenu/MobileMenu";
import ListRoom from "../components/list-room/list-room";
import Settings from "../components/settings/settings";
import Contacts from "../components/contacts/contacts";
import AddFriend from "../components/addFriend/addFriend";

function ChatList(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({ new: "", previous: "" });
  const [receiver, setReceiver] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatHeader, setChatHeader] = useState([]);
  const [messageInput, setMessageInput] = useState(false);
  const [userOnline, setUserOnline] = useState([]);
  const [notif, setNotif] = useState({
    show: false,
  });

  const [listOfFriendRequests, setListOfFriendRequests] = useState([]);
  const [listOfPendingRequests, setListOfPendingRequests] = useState([]);
  const [listOfContacts, setListOfContacts] = useState([]);

  // Modal
  const [showMenuModal, setShowMenuModal] = useState(false);

  const handleClose = () => setShowMenuModal(false);
  const handleShow = () => setShowMenuModal(true);

  // Menu Hooks
  const [displayListRoom, setDisplayListRoom] = useState(true);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [displayContacts, setDisplayContacts] = useState(false);
  const [displayAddFriend, setDisplayAddFriend] = useState(false);

  // Mobile Size Hooks

  const { user_name, user_id, user_image } = props.auth.data;

  const userId = props.auth.data.user_id;

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
        // setmessages[index - 1]([...messages, dataMessage]);
        // setmessages[index + 1]([...messages, dataMessage]);
      });
      connect();
    }
    getContactsWithoutUser();
    getDataofRooms();
    getFriendRequestLists();
    getPendingRequestLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages, user_id]);

  const getUserData = () => {
    // console.log("Testing the getUserData function");
    props
      .getUserbyId(userId)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const connect = () => {
    props.socket.emit("connect-server", userId);
    props.socket.on("list-users-online", (listUsersOnline) => {
      setUserOnline(listUsersOnline);
    });
    props.socket.on("notif-message", (data) => {
      console.log("Test");
      console.log(data);
      setNotif(data);
    });
  };

  const getContactsWithoutUser = () => {
    props
      .getContactsDataOnly(user_id)
      .then((res) => {
        const contactIds = res.value.data.data;
        const contactUserIdMapped = contactIds.map((a) => a.contact_user_id);
        const contactFriendIdMapped = contactIds.map(
          (a) => a.contact_friend_id
        );
        const concatArrays = contactUserIdMapped.concat(contactFriendIdMapped);
        setListOfContacts(concatArrays);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFriendRequestLists = () => {
    props
      .getFriendRequest(user_id)
      .then((res) => {
        const requestId = res.value.data.data;
        const requestIdMapped = requestId.map((a) => a.contact_user_id);
        // console.log(res.value.data.data);
        setListOfFriendRequests(requestIdMapped);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPendingRequestLists = () => {
    props
      .getPendingRequest(user_id)
      .then((res) => {
        // console.log(res.value.data.data);
        const pendingId = res.value.data.data;
        const pendingMapped = pendingId.map((a) => a.contact_user_id);
        setListOfPendingRequests(pendingMapped);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  // MENU FUNCTIONS //
  const backToChat = () => {
    setShowMenuModal(false);
    setDisplayListRoom(true);
    setDisplaySettings(false);
    setDisplayContacts(false);
    setDisplayAddFriend(false);
  };

  const goToSetting = () => {
    setShowMenuModal(false);
    setDisplayListRoom(false);
    setDisplaySettings(true);
    setDisplayContacts(false);
    setDisplayAddFriend(false);
  };

  const goToContacts = () => {
    setShowMenuModal(false);
    setDisplayListRoom(false);
    setDisplaySettings(false);
    setDisplayContacts(true);
    setDisplayAddFriend(false);
  };

  const goToAddFriend = () => {
    setShowMenuModal(false);
    setDisplayListRoom(false);
    setDisplaySettings(false);
    setDisplayContacts(false);
    setDisplayAddFriend(true);
  };
  // MENU FUNCTIONS //

  // Edit and Delete Chat Hooks
  const [showChatSettings, setShowChatSettings] = useState("");
  // this.setState({ hover: {...this.state.hover, i: false }})

  // Edit Chat Form Hooks
  const [showEditChat, setShowEditChat] = useState("");

  // CHAT MENU FUNCTION //
  const showEditandDelete = (index) => {
    setShowChatSettings(index);
  };

  const hideEditandDelete = () => {
    setShowChatSettings("");
  };

  const editChatFormHandle = () => {
    setShowEditChat(true);
  };

  const editChatHandle = () => {
    console.log("Edit chat succesful!");
  };

  const deleteChatHandle = () => {
    console.log("Delete chat succesful!");
  };
  // CHAT MENU FUNCTION //

  const selectRoom = (room_chat, user_id, user_name) => {
    setMessageInput(true);
    props.socket.emit("joinRoom", {
      room: room_chat,
      previousRoom: room.previous,
      user_name,
    });
    setRoom({ ...room, new: room_chat, old: room_chat });
    setReceiver(user_id);
    setChatHeader({ user_name });
    getChatHistory(room_chat);
  };

  const submitChatMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const setData = {
        room: room.new,
        senderId: user_id,
        user_name,
        user_image,
        receiverId: receiver,
        message,
      };
      const data = {
        roomChat: room.new,
        senderId: user_id,
        userName: user_name,
        receiverId: receiver,
        chatMessage: message,
        show: true,
      };
      // props
      //   .insertChat(data)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // props.socket.emit("globalMessage", setData);
      // props.socket.emit("privateMessage", setData);
      // props.socket.emit("broadcastMessage", setData);
      props.socket.emit("roomMessage", setData);
      props.socket.emit("notif-message", data);
      setMessage(""); // Mmebuat form kosong kembali setelah mengirimkan pesan
    }
  };

  const handleLogOut = () => {
    props.socket.emit("disconnect-server", { userId });
    localStorage.clear();
    props.history.push("/login");
  };

  // Small Screen/Mobile Menu Left Menu
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
  const [undisplayMobileMenu, setUndisplayMobileMenu] = useState(false);

  const showMobileMenu = (breakpoint) => {
    setDisplayMobileMenu(breakpoint);
    // setShowFullModal(true);
  };

  const hideMobileMenu = () => {
    setDisplayMobileMenu(false);
  };

  return (
    <>
      {/* LIST ROOM ON MOBILE */}
      <MobileMenu
        show={displayMobileMenu}
        close={hideMobileMenu}
        className={style.mobileMenu}
        style={{ zIndex: "2" }}
      />
      {/* LIST ROOM ON MOBILE */}
      <FontAwesomeIcon
        icon={faArrowAltCircleRight}
        title="Edit chat"
        className={style.displayRoomChatListIcon}
        style={{ zIndex: "2", height: "30px", width: "30px" }}
        onClick={() => showMobileMenu(true)}
      />
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
          <div
            className="my-3 d-flex align-items-center"
            onClick={() => goToSetting()}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faCog} />
            <h5 className="my-auto">Settings</h5>
          </div>
          <div
            className="my-3 d-flex align-items-center"
            onClick={() => goToContacts()}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faUserFriends} />
            <h5 className="my-auto">Contacts</h5>
          </div>
          <div
            className="my-3 d-flex align-items-center"
            onClick={() => goToAddFriend()}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faUsers} />
            <h5 className="my-auto">Add Friends</h5>
          </div>
          <div className="my-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faQuestionCircle} />
            <h5 className="my-auto">Talkagram FAQ</h5>
          </div>
          <div className="my-3">
            <Button onClick={() => handleClose()}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
      <Container fluid className={style.wholeContainer}>
        <Row className={style.wholeRow}>
          <Col lg={3} md={3} className={`d-none d-md-block`}>
            <div className="my-4 d-flex justify-content-between">
              <h3 className={style.boldLogo}>Talkagram</h3>
              <FontAwesomeIcon
                icon={faBars}
                className={style.showMenuIcon}
                onClick={() => handleShow()}
              />
            </div>
            {displayListRoom && (
              <div className={`my-3`}>
                <ListRoom
                  data={rooms}
                  onlineList={userOnline}
                  selectRoom={selectRoom}
                />
              </div>
            )}
            {displaySettings && (
              <div className="my-3">
                <Settings
                  {...props}
                  backToChat={backToChat}
                  handleLogOut={handleLogOut}
                  getUserData={getUserData}
                />
              </div>
            )}
            {displayContacts && (
              <div className="my-3">
                <Contacts
                  {...props}
                  backToChat={backToChat}
                  userOnline={userOnline}
                />
              </div>
            )}
            {displayAddFriend && (
              <div className="my-3">
                <AddFriend
                  {...props}
                  backToChat={backToChat}
                  listOfContacts={listOfContacts}
                  listOfFriendRequests={listOfFriendRequests}
                  listOfPendingRequests={listOfPendingRequests}
                />
              </div>
            )}
          </Col>
          <Col lg={9} md={9} sm={12} xs={12} className={style.chatRoomStyling}>
            {messageInput && (
              <div>
                <Container className="py-4">
                  <div className="d-flex">
                    <Image
                      src={noProfilePicture}
                      alt=""
                      className={`${style.headerProfilePicture} me-4`}
                      fluid
                    />
                    <div
                      className={
                        !userOnline.includes(receiver)
                          ? "d-flex align-items-center"
                          : null
                      }
                    >
                      <h5>{chatHeader.user_name}</h5>
                      {userOnline.includes(receiver) ? <h6>Online</h6> : null}
                    </div>
                  </div>
                </Container>
              </div>
            )}
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
              chatHistory.map((item, index) => {
                return (
                  <Container
                    key={index}
                    onMouseEnter={() => showEditandDelete(index)}
                    onMouseLeave={() => hideEditandDelete()}
                    style={{ cursor: "pointer" }}
                    className={
                      item.sender_id !== userId
                        ? style.senderChatHistoryAlign
                        : style.receiverChatHistoryAlign
                    }
                  >
                    <Image
                      src={
                        item.user_image
                          ? `${process.env.REACT_APP_IMAGE_URL}${item.user_image}`
                          : noProfilePicture
                      }
                      alt=""
                      className={`${style.chatMessageHistoryProfilePicture} me-3`}
                      style={
                        (item.sender_id === userId &&
                          !chatHistory[index + 1]) ||
                        (item.sender_id === userId &&
                          chatHistory[index + 1] &&
                          chatHistory[index + 1].user_id !== item.user_id)
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    />
                    {item.sender_id !== userId && (
                      <span
                        className={
                          showChatSettings === index
                            ? style.chatMessagesSettingStylingDisplay
                            : style.chatMessagesSettingStylingHide
                        }
                      >
                        <span>
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            title="Edit chat"
                            onClick={() => editChatHandle()}
                          />
                        </span>
                        <span className="mx-3">
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            title="Delete chat"
                            onClick={() => deleteChatHandle()}
                          />
                        </span>
                      </span>
                    )}
                    <div
                      className={
                        item.sender_id !== userId
                          ? style.senderChatBubble
                          : style.receiverChatBubble
                      }
                      style={
                        // USER BUBBLE CHAT STYLING
                        // No previous bubble chat at all (for receiver)
                        // No next bubble chat at all (for receiver)
                        !chatHistory[index - 1] &&
                        !chatHistory[index + 1] &&
                        item.sender_id === userId
                          ? { borderRadius: "20px 20px 20px 5px" }
                          : // No previous bubble chat at all (for sender)
                          // No next bubble chat at all (for sender)
                          !chatHistory[index - 1] &&
                            !chatHistory[index + 1] &&
                            item.sender_id !== userId
                          ? { borderRadius: "20px 20px 5px 20px" }
                          : // No previous bubble chat at all
                          // But there's next bubble chat from the same user
                          !chatHistory[index - 1] &&
                            chatHistory[index + 1].user_id === item.user_id &&
                            item.sender_id === userId
                          ? { borderRadius: "20px 20px 20px 5px" }
                          : // There's previous bubble chat, but not from the same user
                          // But there's next bubble chat from the same user
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id !== item.user_id &&
                            chatHistory[index + 1] &&
                            chatHistory[index + 1].user_id === item.user_id &&
                            item.sender_id === userId
                          ? { borderRadius: "20px 20px 20px 5px" }
                          : // There's previous bubble chat from the same user
                          // But there's next bubble chat from different user
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id === item.user_id &&
                            chatHistory[index + 1] &&
                            chatHistory[index + 1].user_id !== item.user_id &&
                            item.sender_id === userId
                          ? { borderRadius: "5px 20px 20px 20px" }
                          : // There's previous bubble chat from the same user
                          // Also there's next bubble chat from the same user
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id === item.user_id &&
                            chatHistory[index + 1] &&
                            chatHistory[index + 1].user_id === item.user_id &&
                            item.sender_id === userId
                          ? { borderRadius: "5px 20px 20px 5px" }
                          : // There's previous bubble chat from the same user
                          // But there's no next bubble chat at all
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id === item.user_id &&
                            !chatHistory[index + 1] &&
                            item.sender_id === userId
                          ? { borderRadius: "5px 20px 20px 20px" }
                          : // SENDER (NOT USER) BUBBLE CHAT STYLING
                          // No previous bubble chat at all
                          // But there's next bubble chat from the same user
                          !chatHistory[index - 1] &&
                            chatHistory[index + 1].user_id === item.user_id &&
                            item.sender_id !== userId
                          ? { borderRadius: "20px 20px 5px 20px" }
                          : // There's previous bubble chat, but not from the same user
                          // But there's bubble chat from the same user
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id !== item.user_id &&
                            chatHistory[index + 1] &&
                            chatHistory[index + 1].user_id === item.user_id &&
                            item.sender_id !== userId
                          ? { borderRadius: "20px 20px 5px 20px" }
                          : // There's previous bubble chat from the same user
                          // But there's next bubble chat from different user
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id === item.user_id &&
                            chatHistory[index + 1] &&
                            chatHistory[index + 1].user_id !== item.user_id &&
                            item.sender_id !== userId
                          ? { borderRadius: "20px 5px 20px 20px" }
                          : // There's previous bubble chat from the same user
                          // Also there's next bubble chat from the same user
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id === item.user_id &&
                            chatHistory[index + 1] &&
                            chatHistory[index + 1].user_id === item.user_id &&
                            item.sender_id !== userId
                          ? { borderRadius: "20px 5px 5px 20px" }
                          : // There's previous bubble chat from the same user
                          // But there's no next bubble chat at all
                          chatHistory[index - 1] &&
                            chatHistory[index - 1].user_id === item.user_id &&
                            !chatHistory[index + 1] &&
                            item.sender_id !== userId
                          ? { borderRadius: "20px 5px 20px 20px" }
                          : null
                      }
                    >
                      <div
                        className={
                          item.sender_id !== userId
                            ? style.senderChatHistory
                            : style.receiverChatHistory
                        }
                      >
                        <span>
                          <span>{item.message}</span>
                        </span>
                      </div>
                    </div>
                    {item.sender_id === userId && (
                      <span
                        className={
                          showChatSettings === index
                            ? style.chatMessagesSettingStylingDisplay
                            : style.chatMessagesSettingStylingHide
                        }
                      >
                        <span className="mx-3">
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            title="Edit chat"
                            onClick={() => editChatHandle()}
                          />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            title="Delete chat"
                            onClick={() => deleteChatHandle()}
                          />
                        </span>
                      </span>
                    )}
                    {item.sender_id !== userId && (
                      <Image
                        src={
                          item.user_image
                            ? `${process.env.REACT_APP_IMAGE_URL}${item.user_image}`
                            : noProfilePicture
                        }
                        alt=""
                        className={`${style.chatMessageHistoryProfilePicture} ms-3`}
                        style={
                          (item.sender_id !== userId &&
                            !chatHistory[index + 1]) ||
                          (item.sender_id !== userId &&
                            chatHistory[index + 1] &&
                            chatHistory[index + 1].user_id !== item.user_id)
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      />
                    )}
                  </Container>
                );
              })}

            {messages.map((item, index) => {
              console.log(item);
              return (
                <Container className={style.chatMessagesContainer}>
                  <div className={style.chatMessagesInnerContainer}>
                    <div
                      key={index}
                      className={
                        item.senderId !== userId
                          ? style.senderChatHistoryAlign
                          : style.receiverChatHistoryAlign
                      }
                    >
                      <Image
                        src={
                          item.user_image
                            ? `${process.env.REACT_APP_IMAGE_URL}${item.user_image}`
                            : noProfilePicture
                        }
                        alt=""
                        className={`${style.chatMessageHistoryProfilePicture} me-3`}
                        style={
                          (item.senderId === userId && !messages[index + 1]) ||
                          (item.senderId === userId &&
                            messages[index + 1] &&
                            messages[index + 1].userId !== item.userId)
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      />
                      <div
                        className={
                          item.senderId !== userId
                            ? style.senderChatBubble
                            : style.receiverChatBubble
                        }
                        style={
                          // No previous bubble chat at all (for receiver)
                          // No next bubble chat at all (for receiver)
                          !messages[index - 1] &&
                          !messages[index + 1] &&
                          item.senderId === userId
                            ? { borderRadius: "20px 20px 20px 5px" }
                            : // No previous bubble chat at all (for sender)
                            // No next bubble chat at all (for sender)
                            !messages[index - 1] &&
                              !messages[index + 1] &&
                              item.senderId !== userId
                            ? { borderRadius: "20px 5px 20px 20px" }
                            : // USER BUBBLE CHAT STYLING
                            // No previous bubble chat at all
                            // But there's next bubble chat from the same user
                            !messages[index - 1] &&
                              messages[index + 1].senderId === item.senderId &&
                              item.senderId === userId
                            ? { borderRadius: "20px 20px 20px 5px" }
                            : // There's previous bubble chat, but not from the same user
                            // But there's next bubble chat from the same user
                            messages[index - 1] &&
                              messages[index - 1].senderId !== item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId === item.senderId &&
                              item.senderId === userId
                            ? { borderRadius: "20px 20px 20px 5px" }
                            : // There's previous bubble chat from the same user
                            // But there's next bubble chat from different user
                            messages[index - 1] &&
                              messages[index - 1].senderId === item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId !== item.senderId &&
                              item.senderId === userId
                            ? { borderRadius: "5px 20px 20px 20px" }
                            : // There's previous bubble chat from the same user
                            // Also there's next bubble chat from the same user
                            messages[index - 1] &&
                              messages[index - 1].senderId === item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId === item.senderId &&
                              item.senderId === userId
                            ? { borderRadius: "5px 20px 20px 5px" }
                            : // There's previous bubble chat from the same user
                            // But there's no next bubble chat at all
                            messages[index - 1] &&
                              messages[index - 1].senderId === item.senderId &&
                              !messages[index + 1] &&
                              item.senderId === userId
                            ? { borderRadius: "5px 20px 20px 20px" }
                            : // There's no previous bubble chat from the same user
                            // There's no next bubble chat from the same user
                            messages[index - 1] &&
                              messages[index - 1].senderId !== item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId !== item.senderId &&
                              item.senderId === userId
                            ? { borderRadius: "5px 20px 20px 20px" }
                            : // SENDER (NOT USER) BUBBLE CHAT STYLING
                            // No previous bubble chat at all
                            // But there's next bubble chat from the same user
                            !messages[index - 1] &&
                              messages[index + 1].senderId === item.senderId &&
                              item.senderId !== userId
                            ? { borderRadius: "20px 20px 5px 20px" }
                            : // There's previous bubble chat, but not from the same user
                            // But there's next bubble chat from the same user
                            messages[index - 1] &&
                              messages[index - 1].senderId !== item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId === item.senderId &&
                              item.senderId !== userId
                            ? { borderRadius: "20px 20px 5px 20px" }
                            : // There's previous bubble chat from the same user
                            // But there's next bubble chat from different user
                            messages[index - 1] &&
                              messages[index - 1].senderId === item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId !== item.senderId &&
                              item.senderId !== userId
                            ? { borderRadius: "20px 5px 20px 20px" }
                            : // There's previous bubble chat from the same user
                            // Also there's next bubble chat from the same user
                            messages[index - 1] &&
                              messages[index - 1].senderId === item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId === item.senderId &&
                              item.senderId !== userId
                            ? { borderRadius: "20px 5px 5px 20px" }
                            : // There's previous bubble chat from the same user
                            // But there's no next bubble chat at all
                            messages[index - 1] &&
                              messages[index - 1].senderId === item.senderId &&
                              !messages[index + 1] &&
                              item.senderId !== userId
                            ? { borderRadius: "20px 5px 20px 20px" }
                            : // There's no previous bubble chat from the same user
                            // There's no next bubble chat from the same user
                            messages[index - 1] &&
                              messages[index - 1].senderId !== item.senderId &&
                              messages[index + 1] &&
                              messages[index + 1].senderId !== item.senderId &&
                              item.senderId !== userId
                            ? { borderRadius: "20px 20px 5px 20px" }
                            : null
                        }
                      >
                        <div
                          className={
                            item.senderId !== userId
                              ? style.senderChatHistory
                              : style.receiverChatHistory
                          }
                        >
                          <span>
                            <span>{item.message}</span>
                          </span>
                        </div>
                      </div>
                      {item.senderId !== userId && (
                        <Image
                          src={
                            item.user_image
                              ? `${process.env.REACT_APP_IMAGE_URL}${item.user_image}`
                              : noProfilePicture
                          }
                          alt=""
                          className={`${style.chatMessageHistoryProfilePicture} ms-3`}
                          style={
                            (item.senderId !== userId &&
                              !messages[index + 1]) ||
                            (item.senderId !== userId &&
                              messages[index + 1] &&
                              messages[index + 1].userId !== item.userId)
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                        />
                      )}
                    </div>
                  </div>
                </Container>
              );
            })}
          </Col>
        </Row>
        <Toast
          className={style.notificationToast}
          onClose={() => setNotif({ ...notif, show: false })}
          show={notif.show}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-1"
              alt=""
            />
            <h6 className="fw-bold mx-auto">{notif.userName}</h6>
          </Toast.Header>
          <Toast.Body>{notif.chatMessage}</Toast.Body>
        </Toast>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
const mapDispatchToProps = {
  getRooms,
  insertChat,
  chatHistory,
  getUserbyId,
  getFriendRequest,
  getPendingRequest,
  getContactsDataOnly,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
