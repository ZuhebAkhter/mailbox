import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Stack,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import ComposeModal from "../Modals/ComposeModal";
import MessageContext from "../../Store/MessageContext";
import { Link } from "react-router-dom";
import "./Home.css";

const SentMessage = (props) => {
  const [show, setShow] = useState(false);
  const messageCtx = useContext(MessageContext);
  const [sentMess,setSentmessage]=useState([]);

  useEffect(()=>{
    setSentmessage(messageCtx.loadedMessages)
  },[messageCtx.loadedMessages])

  console.log(messageCtx.loadedMessages)

  const showModalHandler = () => {
    setShow(true);
  };
  const hideModalHandler = () => {
    setShow(false);
  };
  
  return (
    <Container fluid style={{height:'100vw'}}>
      <Row className="h-100">
        <Col className="bg-dark" xs={2}>
          <Button
            className="mb-4 mt-2 ms-5 px-4  py-3"
            onClick={showModalHandler}
          >
            <i className="bi bi-pencil"></i> Compose
          </Button>
          {show && (
            <ComposeModal show={showModalHandler} hide={hideModalHandler} />
          )}

          <ListGroup>
            <ListGroup.Item ><i className="bi bi-messenger">  </i><Link className="link-underline link-underline-opacity-0 text-dark" to={'/welcome'}>Inbox</Link>
</ListGroup.Item>
            <ListGroup.Item><i className="bi bi-star me-2"></i>Starred</ListGroup.Item>
            <ListGroup.Item><Link className="link-underline link-underline-opacity-0 text-dark" to={'/sent'}><i className="bi bi-upload me-2"></i>Sent</Link></ListGroup.Item>

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

          <Card className="mt-4 py-0" style={{ width: "77rem" }}>
            <ListGroup variant="flush">
              {sentMess?.map((ele) => (
                
                  

                  <Stack key={ele.id}  className="border" direction="horizontal" gap={5}>
                    <div className="col-2 ps-1"><Link className="link-underline link-underline-opacity-0 text-dark"  to={`/welcome/${ele.id}`}>{ele.userMail}</Link></div>
                    <div id="card" className="p-2">
                      {ele.usertext}

                    </div>
                    {/* <Button onClick={()=>{deleteMessageHandler(ele.id)}} className="float-end py-2" variant="danger"><i className="bi bi-trash"></i></Button> */}
                  </Stack>
                
               ))} 
            </ListGroup>

          </Card>
          {sentMess.length === 0 ? <h2 className="text-center m-5 p-5">No Messgaes Found</h2>: ''}

        </Col>
      </Row>
    </Container>
  );
};

export default SentMessage;