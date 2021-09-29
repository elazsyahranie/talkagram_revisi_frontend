import { Image } from "react-bootstrap";
import style from "./list-room.module.css";
import noProfilePicture from "../../components/img-not-found.png";

function ListRoom(rooms) {
  // console.log(rooms.data);
  return (
    <>
      {rooms.data.length > 0 ? (
        rooms.data.map((item, index) => (
          <div
            className="mb-3 d-flex"
            key={index}
            onClick={() =>
              rooms.selectRoom(item.room_chat, item.user_id, item.user_name)
            }
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
            <div className={`${style.roomUserStyling} my-auto`}>
              <h5 className="mb-2">{item.user_name}</h5>
              <h6 className="mt-2">{item.user_email}</h6>
            </div>
          </div>
        ))
      ) : (
        <>
          <div>
            <h6>Go to menu to find a friend to start chat with!</h6>
          </div>
        </>
      )}
    </>
  );
}

export default ListRoom;
