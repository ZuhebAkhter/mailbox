import { useRef, useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import "./ComposeModal.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function ComposeModal({ show, hide }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const subjectInputref=useRef();
  const usersInputref=useRef();

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const sendFormDataHandler= async(e)=>{
    e.preventDefault();
    const enteredUser=usersInputref.current.value;
    const enteredSub=subjectInputref.current.value;
     const enteredMessage = convertToRaw(editorState.getCurrentContent());
     console.log(enteredUser,enteredSub,enteredMessage.blocks)
     let message='';

      enteredMessage.blocks.map((ele)=>(
        message=message + " " + ele.text
        
      ))
      const userMessage={
        userMail:enteredUser,
        userSub:enteredSub,
        usertext:message
      }
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


        const response = await fetch(`https://try2-7cacf-default-rtdb.asia-southeast1.firebasedatabase.app/${emailofUser}.json`, {
          method: 'POST',
          body: JSON.stringify(userMessage),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
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
      </Modal>
    </>
  );
}

export default ComposeModal;
