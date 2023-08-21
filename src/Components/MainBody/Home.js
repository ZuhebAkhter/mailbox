import React, { useContext, useState } from "react";
import {
  Col,
  Container,
  Row,
  Stack,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ComposeModal from "../Modals/ComposeModal";
import MessageContext from "../../Store/MessageContext";
import "./Home.css";

const Home = () => {
  const [show, setShow] = useState(false);
  const messageCtx = useContext(MessageContext);
  const showModalHandler = () => {
    setShow(true);
  };
  const hideModalHandler = () => {
    setShow(false);
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
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
            <ListGroup.Item>Inbox</ListGroup.Item>
            <ListGroup.Item>Starred</ListGroup.Item>
            <ListGroup.Item>Snoozed</ListGroup.Item>
            <ListGroup.Item>Darfts</ListGroup.Item>
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
          {/* <Stack  className='mt-4'>
            {messageCtx.loadedMessages.map((ele)=>(
            <div id="card" className="border p-2">{ele.text}</div>

            ))}
            <div className="border p-2">Second item</div>
            <div className="border p-2">Third item</div>
            <div className="border p-2">Second item</div>
            <div className="border p-2">Second item</div>
            <div className="border p-2">Second item</div>
            <div className="border p-2">Second item</div>
            <div className="border p-2">Second item</div>

          </Stack> */}
          <Card className="mt-4 py-0" style={{ width: "75rem" }}>
          
            <ListGroup variant="flush">
           { messageCtx.loadedMessages.map((ele)=>(
            <Stack className="border" direction="horizontal" gap={5}>
              {/* <ListGroup.Item className="border-none" >{ele.sub}</ListGroup.Item>
              <ListGroup.Item id="card">{ele.text}</ListGroup.Item> */}
              <div className="col-2 ps-1">{ele.sub}</div>
            <div id="card" className="p-2">{ele.text}</div>
            <div className="hr"></div>

              </Stack>
            ))}

             
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
