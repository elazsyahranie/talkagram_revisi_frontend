import { Form, Image } from "react-bootstrap";
import { useState } from "react";
import style from "./addFriend.module.css";
import leftArrow from "../back.png";
import noProfilePicture from "../../components/img-not-found.png";
import { getContactsKeyword } from "../../../redux/action/user";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function AddFriend(props) {
  const [keyword, setKeyword] = useState("");
  const [listOfUsers, setListOfUsers] = useState();

  const handleKeywordChange = (event) => {
    setKeyword({ ...keyword, [event.target.name]: event.target.value });
  };

  const submitKeyword = (event) => {
    event.preventDefault();
    props
      .getContactsKeyword(keyword.keyword)
      .then((res) => {
        setListOfUsers(res.value.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  // console.log(listOfUsers);

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Image
            src={leftArrow}
            alt=""
            onClick={() => props.backToChat()}
            className={style.shownDot}
            fluid
          />
        </div>
        <h5 className={`${style.componentTitleStyling} fw-bold`}>Add Friend</h5>
        <Image src={leftArrow} alt="" className={style.hiddenDot} />
      </div>
      <Form className="mb-3" onSubmit={(event) => submitKeyword(event)}>
        <Form.Control
          type="text"
          className={style.topFormControl}
          name="keyword"
          onChange={(event) => handleKeywordChange(event)}
        ></Form.Control>
      </Form>
      <div>
        {listOfUsers
          ? listOfUsers.map((item, index) => (
              <div
                className="mb-3 d-flex"
                key={index}
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
                  <h5>{item.user_name}</h5>
                  <span
                    className={`${style.contactStatus} position-relative mx-auto`}
                  >
                    <span className="ms-2 me-2 my-1">ContactStatus</span>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className={`${style.alreadyFriends} position-absolute`}
                    />
                  </span>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

const mapStatetoProps = (state) => ({
  user: state.user,
});

const mapDispatchtoProps = {
  getContactsKeyword,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddFriend);
