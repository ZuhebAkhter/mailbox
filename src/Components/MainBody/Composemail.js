import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Composemail.css';
import { Container, Form ,InputGroup} from 'react-bootstrap';

const Composemail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    console.log(content);
  };
  return (
    <>
    <Container>
    <Form>
    <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
      </InputGroup>
      <div className="editor-container">
      {/* <div className="editor-toolbar">
       
      </div> */}
      <Editor
        // editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="editor-wrapper"
        editorClassName="editor-content"
        editorState={editorState}

      />
    </div>
    </Form>
    </Container>
    </>
  );
};

export default Composemail;