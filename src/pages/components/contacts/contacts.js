import { Container, Row } from "react-bootstrap";

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
        </Row>
      </Container>
    </>
  );
}

export default Contacts;
