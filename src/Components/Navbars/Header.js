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
    const userLogged=localStorage.getItem('user')
  return (
      
    <Navbar  className="bg-info">
        <Navbar.Brand><i className="bi bi-envelope-at-fill p-2"></i>
Mail Box</Navbar.Brand>
       
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {userLogged}
          </Navbar.Text>
         {authCtx.isLoggedIn && <Button className='m-2' onClick={LogoutHandler} variant='danger'>Logout</Button>}
        </Navbar.Collapse>
      
    </Navbar>
    
  )
}

export default Header