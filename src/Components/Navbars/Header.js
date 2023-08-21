import React, { useContext } from 'react'
import {Navbar,Container, Button} from 'react-bootstrap'
import AuthContext from '../../Store/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const authCtx=useContext(AuthContext)
    const navigate=useNavigate();
    const LogoutHandler=()=>{
   authCtx.logout();
   navigate('/')
    }
  return (
    <Navbar className="bg-info">
      <Container fluid>
        <Navbar.Brand>Mail Box</Navbar.Brand>
       
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
          <Button className='m-2' onClick={LogoutHandler} variant='danger'>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header