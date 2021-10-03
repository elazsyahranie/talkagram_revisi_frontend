import { Form, Image } from "react-bootstrap";
import { useState } from "react";
import style from "./addFriend.module.css";
import leftArrow from "../back.png";
import noProfilePicture from "../../components/img-not-found.png";
import { getContactsKeyword, sendInvitation } from "../../../redux/action/user";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
        console.log(err);
      });
  };

  const submitInvitation = (userIdToInvite) => {
    // console.log(userIdToInvite);
    // console.log(props.auth.data.user_id);
    const setData = {
      contactUserId: props.auth.data.user_id,
      contactFriendId: userIdToInvite,
    };
    props
      .sendInvitation(setData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(setData);
    console.log("Send invitation works!");
  };

  const theListofContacts = props.listOfContacts;
  const theListofRequests = props.listOfFriendRequests;
  console.log(theListofContacts);

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
                  {!theListofContacts.includes(item.user_id) &&
                  !theListofRequests.includes(item.user_id) ? (
                    <span
                      className={`${style.contactStatus} position-relative mx-auto`}
                      onClick={() => submitInvitation(item.user_id)}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className={`${style.inviteIconStyling}`}
                      />
                      <span className="ms-2 me-2 my-1">Add as Friend</span>
                    </span>
                  ) : !theListofContacts.includes(item.user_id) &&
                    theListofRequests.includes(item.user_id) ? null : null}
                  {theListofContacts.includes(item.user_id) ? (
                    <span>
                      <i>Friends</i>
                    </span>
                  ) : null}
                  {theListofRequests.includes(item.user_id) ? (
                    <span>
                      <i>Requested</i>
                    </span>
                  ) : null}
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
  sendInvitation,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddFriend);
