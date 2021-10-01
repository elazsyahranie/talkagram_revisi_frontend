import { Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import style from "./contacts.module.css";

function Contacts(props) {
  return (
    <>
      <Container>
        <Row>
          <div className="d-flex justify-content-center">
            <span
              onClick={() => props.backToChat()}
              style={{ cursor: "pointer" }}
            >
              <small>Return to Room List</small>
            </span>
          </div>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={3}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={1}
            containerClassName={style.pagination}
            subContainerClassName={`${style.pages} ${style.pagination}`}
            activeClassName={style.active}
          />
        </Row>
      </Container>
    </>
  );
}

export default Contacts;
