import { Image, Form } from "react-bootstrap";
// import { useState } from "react";
import style from "./list-room.module.css";
import noProfilePicture from "../../components/img-not-found.png";

function ListRoom(rooms) {

  const handleSearchRoom = (event) => {
    console.log(event.target.value);
    // setRoomForm({[event.target.name]: event.target.value}); 
  }

  console.log(rooms)

  return (
    <>
      <Form className="mb-3">
        <Form.Control
          type="text" 
          name="roomForm"
          className={style.topFormControl}
          onChange={(event) => handleSearchRoom(event)}
        ></Form.Control>
      </Form>
      {rooms.listRooms.length > 0 ? (
        rooms.listRooms.map((item, index) => {
          const filteredMessages = rooms.messages.filter(function (el) {
            return el.room === item.room_chat;
          });
          return (
            <div
              className={`mb-3 d-flex ${style.overflowTextOuter}`}
              key={index}
              onClick={() =>
                rooms.selectRoom(item.room_chat, item.user_id, item.user_name)
              }
              style={{
                cursor: "pointer",
              }}
            >
              <div>
                <Image
                  src={noProfilePicture}
                  alt=""
                  className={style.profilePictureStyling}
                />
              </div>
              <div className={`ms-2 my-auto ${style.overflowTextParent}`}>
                <h5 className={`mb-2`}>{item.user_name}</h5>
                <h6 className={`mt-2`}>
                  {filteredMessages.length === 0
                    ? item.last_chat
                    : filteredMessages.length > 0
                    ? filteredMessages[filteredMessages.length - 1].message
                    : null}
                </h6>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <div>
            <h6>Go to menu to find a friend to start chat with!</h6>
          </div>
        </>
      )}
      {/* {rooms.data.length > 0 ? (
        rooms.data.map((item, index) => {
          const filteredMessages = rooms.messages.filter(function (el) {
            return el.room === item.room_chat;
          });
          return (
            <div
              className={`mb-3 d-flex ${style.overflowTextOuter}`}
              key={index}
              onClick={() =>
                rooms.selectRoom(item.room_chat, item.user_id, item.user_name)
              }
              style={{
                cursor: "pointer",
              }}
            >
              <div>
                <Image
                  src={noProfilePicture}
                  alt=""
                  className={style.profilePictureStyling}
                />
              </div>
              <div className={`ms-2 my-auto ${style.overflowTextParent}`}>
                <h5 className={`mb-2`}>{item.user_name}</h5>
                <h6 className={`mt-2`}>
                  {filteredMessages.length === 0
                    ? item.last_chat
                    : filteredMessages.length > 0
                    ? filteredMessages[filteredMessages.length - 1].message
                    : null}
                </h6>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <div>
            <h6>Go to menu to find a friend to start chat with!</h6>
          </div>
        </>
      )} */}
    </>
  );
}

export default ListRoom;
