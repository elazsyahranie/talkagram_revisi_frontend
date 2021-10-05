/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row, Image } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { getContactPagination } from "../../../redux/action/user";
import { connect } from "react-redux";
import style from "./contacts.module.css";

import noProfilePicture from "../../components/img-not-found.png";

function Contacts(props) {
  const [totalPage, setTotalPage] = useState("");
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [sort, setSort] = useState("user_id ASC");
  // eslint-disable-next-line
  const [search, setSearch] = useState("");

  // CONTACT HOOKS
  const [contactList, setContactList] = useState();

  useEffect(() => {
    props
      .getContactPagination(props.auth.data.user_id, page, sort, search)
      .then((res) => {
        console.log(res.value.data.pagination);
        setTotalPage(res.value.data.pagination.totalPage);
        setContactList(res.value.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(totalPage);

  const pageId = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
    props
      .getContactPagination(props.auth.data.user_id, selectedPage, sort, search)
      .then((res) => {
        setContactList(res.value.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <Row>
          {contactList &&
            contactList.map((item, index) => (
              <div
                className="mb-3 d-flex"
                key={index}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src={noProfilePicture}
                    alt=""
                    className={style.profilePictureStyling}
                    fluid
                  />
                </div>
                <div className={`${style.roomUserStyling} my-auto`}>
                  <h5 key={index}>{item.user_name}</h5>
                  {props.userOnline.includes(item.user_id) ? (
                    <h6>Online</h6>
                  ) : null}
                </div>
              </div>
            ))}
          {contactList && (
            <div className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={pageId}
                containerClassName={style.pagination}
                subContainerClassName={`${style.pages} ${style.pagination}`}
                activeClassName={style.active}
              />
            </div>
          )}
          <div className="d-flex justify-content-center">
            <span
              onClick={() => props.backToChat()}
              style={{ cursor: "pointer" }}
            >
              <small>Return to Room List</small>
            </span>
          </div>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { getContactPagination };

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
