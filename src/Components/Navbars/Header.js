import React from 'react'
import {Navbar,Container} from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar className="bg-info">
      <Container fluid>
        <Navbar.Brand>Mail Box</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header