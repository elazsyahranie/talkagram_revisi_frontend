/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { getContactPagination } from "../../../redux/action/user";
import { connect } from "react-redux";
import style from "./contacts.module.css";

function Contacts(props) {
  const [totalPage, setTotalPage] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("user_id ASC");
  const [search, setSearch] = useState("");

  // CONTACT HOOKS
  const [contactList, setContactList] = useState();

  useEffect(() => {
    props
      .getContactPagination(props.auth.data.user_id, page, sort, search)
      .then((res) => {
        setContactList(res.value.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(props.auth.data.user_id);

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

  // console.log(contactList);

  return (
    <>
      <Container>
        <Row>
          {contactList &&
            contactList.map((item, index) => (
              <p key={index}>{item.user_name}</p>
            ))}
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={3}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pageId}
              containerClassName={style.pagination}
              subContainerClassName={`${style.pages} ${style.pagination}`}
              activeClassName={style.active}
            />
          </div>
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
