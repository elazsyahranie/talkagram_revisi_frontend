import { Form, Image, Modal } from "react-bootstrap";
import { useState } from "react";
import style from "./addFriend.module.css";
import leftArrow from "../back.png";
import { getContactsKeyword } from "../../../redux/action/user";
import { connect } from "react-redux";

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

  console.log(listOfUsers);

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
        {listOfUsers.length > 0 &&
          listOfUsers.map((item, index) => <p key={index}>{item.user_name}</p>)}
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
