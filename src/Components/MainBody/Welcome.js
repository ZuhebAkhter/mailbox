import React, { useState } from 'react'
import ComposeModal from '../Modals/ComposeModal';
import { Button } from 'react-bootstrap';

const Welcome = () => {
  const [show, setShow] = useState(false);
const showModalHandler=()=>{
        setShow(true)
    }
    const hideModalHandler=()=>{
        setShow(false)
    }
  return (
    <div>
 <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button> 
          {show && <ComposeModal show={showModalHandler} hide={hideModalHandler}/>}
    </div>
  )
}

export default Welcome