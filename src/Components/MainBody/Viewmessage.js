import React, {  useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Container, ListGroup, Col, Button, Row } from "react-bootstrap";
import ComposeModal from "../Modals/ComposeModal";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../Store/MessageSlice";

const Viewmessage = () => {
  const [show, setShow] = useState(false);
const dispatch=useDispatch();
  const params = useParams();
  const messSlice=useSelector(state => state.message.Messages)
 
  const showModalHandler = () => {
    setShow(true);
  };
  const hideModalHandler = () => {
    setShow(false);
  };
  const mes = messSlice.find((mess) => mess.id === params.loadedmessageid);
  console.log(mes);
  const RenderingOldMessHandler=()=>{
    dispatch(updateMessage({
      ...mes,
      read:true
    }))
    // dispatch(fetchCartData())
    
  }
  return (
    <Container fluid style={{ height: "100vw" }}>
      <Row className="h-100">
        <Col className="bg-dark" xs={2}>
          <Button
            className="mb-4 mt-2 ms-5 px-4  py-3"
            onClick={showModalHandler}
          >
            Compose
          </Button>
          {show && (
            <ComposeModal show={showModalHandler} hide={hideModalHandler} />
          )}

          <ListGroup>
            <ListGroup.Item><Link onClick={RenderingOldMessHandler} className="link-underline link-underline-opacity-0" to={'/welcome'}><i className="bi bi-messenger me-2"></i>Inbox</Link></ListGroup.Item>
            <ListGroup.Item><i className="bi bi-star me-2"></i>Starred</ListGroup.Item>
            <ListGroup.Item><i className="bi bi-upload me-2"></i>Sent</ListGroup.Item>

            <ListGroup.Item><i className="bi bi-stopwatch me-2"></i>Snoozed</ListGroup.Item>
            <ListGroup.Item><i className="bi bi-file-earmark-medical me-2"></i>Darfts</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <form className="d-flex mt-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <Card className="m-5 p-3" style={{ width: "68rem" }}>
            <Card.Body>
                <p className="mt-2">From:</p>
              <Card.Title className="mb-5">{mes.rb}</Card.Title>
              <Card.Subtitle className="mb-4 text-muted">
                Sub:{mes.sub}
              </Card.Subtitle>
              <Card.Text>
                <p>Text Message</p>
                {mes.text}
              </Card.Text>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Viewmessage;
