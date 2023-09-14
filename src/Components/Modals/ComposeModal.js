import { useContext, useRef, useState } from "react";
import { Modal, Button, InputGroup, Form, Alert } from "react-bootstrap";
import "./ComposeModal.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AuthContext from "../../Store/AuthContext";
import MessageContext from "../../Store/MessageContext";

function ComposeModal({ show, hide }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [posting,setposting]=useState(false)
  const subjectInputref=useRef();
  const usersInputref=useRef();
  const authCtx=useContext(AuthContext);
  const messCtx=useContext(MessageContext)
  console.log(authCtx)

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const sendFormDataHandler= async(e)=>{
    e.preventDefault();
    const enteredUser=usersInputref.current.value;
    const enteredSub=subjectInputref.current.value;
     const enteredMessage = convertToRaw(editorState.getCurrentContent());
     const from=localStorage.getItem('user');
     console.log(enteredUser,enteredSub,enteredMessage.blocks,from)
     let message='';

      enteredMessage.blocks.map((ele)=>(
        message=message + " " + ele.text
        
      ))
      const userMessage={
        userMail:enteredUser,
        userSub:enteredSub,
        usertext:message,
        from:from,
        read:false
      }
      console.log(userMessage)


      messCtx.loadedMessages.push(userMessage)
    //   const response = await fetch(
    //     `https://httpreact-2edb8-default-rtdb.firebaseio.com/${enteredUser}.json`,
    //     {
    //       method: 'POST',
    //       body: JSON.stringify(userMessage),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('Sending cart data failed.');
    //   }
    //   else{
    //     console.log(response.data)
    //   }
    const emailofUser = enteredUser.split(/[@.]/).join("");


        const response = await fetch(`https://emailclient-16191-default-rtdb.firebaseio.com/${emailofUser}.json`, {
          method: 'POST',
          body: JSON.stringify(userMessage),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setposting(true)

        console.log(data);


      
    };
  
  
  return (
    <>
      <Modal
        show={show}
        // dialogClassName="modal-90w"
        className="modal-xl"
        id="modal"
      >
        <Modal.Header className="m-0 p-0">
          <Modal.Title>
            <p className="fs-6 m-0 p-0">New message</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={sendFormDataHandler}>
            <InputGroup className="mb-2">
              <Form.Control
                placeholder="To"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                ref={usersInputref}
              />
            </InputGroup>
            <InputGroup className="mb-2" >
              <Form.Control placeholder="Subject" ref={subjectInputref} />
            </InputGroup>
            <div className="editor-container">
              {/* <div className="editor-toolbar">
        <button className="editor-button" onClick={handleSave}>
          Save
        </button>
      </div> */}
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="editor-wrapper"
                editorClassName="editor-content"
              />
            </div>
            <div className="d-flex justify-content-between">
              <Button type="submit" className=" my-1" variant="success">
                Send
              </Button>
              <Button onClick={hide} variant="danger" className="my-1">
                Discard
              </Button>
            </div>
          </Form>
        </Modal.Body>
        { posting && <Alert>Message Sent</Alert>}

      </Modal>
    </>
  );
}

export default ComposeModal;
