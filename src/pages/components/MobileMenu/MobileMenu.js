import { Container } from "react-bootstrap";
import style from "./MobileMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "animate.css";

const dropIn = {
  hidden: {
    x: "-100vh",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function MobileMenu({ show, close }) {
  return (
    <>
      <motion.div
        // variants={dropIn}
        // initial="hidden"
        // animate={show ? "visible" : "hidden"}
        style={
          show
            ? { display: "block", zIndex: "3" }
            : { display: "none", zIndex: "3" }
        }
      >
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
      </motion.div>
    </>
  );
}

export default MobileMenu;
