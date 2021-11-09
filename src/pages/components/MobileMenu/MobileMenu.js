import { Container } from "react-bootstrap";
import style from "./MobileMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function MobileMenu({ show, close }) {
  return (
    <>
      {show ? (
        <Container fluid className={style.background}>
          <div className="py-4 d-flex justify-content-between align-items-center">
            <h3 className={style.boldLogo} style={{ padding: "0px" }}>
              Talkagram
            </h3>
            <FontAwesomeIcon
              icon={faTimesCircle}
              title="Edit chat"
              className={style.displayRoomChatListIcon}
              style={{ height: "20px", width: "20px" }}
              onClick={() => close()}
            />
          </div>
        </Container>
      ) : null}
    </>
  );
}

export default MobileMenu;
