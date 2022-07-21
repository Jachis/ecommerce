import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

function NavBar() {
  const logout = () => localStorage.setItem('token', '');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => {

    const token = localStorage.getItem('token');
    if (token) {
      setShow(true)
    } else {
      navigate('/Login')
    }
  }

  return (
    <div>
      <Navbar bg='light' expand='lg' sticky='top'>
        <Container>
          <Navbar.Brand href="/#/">e-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto p-2">
              <Nav.Link href="/#/Login"><i className="fa-solid fa-user"></i></Nav.Link>
              <Nav.Link href="/#/Purchases"><i className="fa-solid fa-cash-register"></i></Nav.Link>
              <Nav.Link role="button" onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
              <Nav.Link role='button' onClick={() => logout()}><i className="fa-solid fa-right-from-bracket"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart handleClose={handleClose} show={show}/>
    </div>
  );
}

export default NavBar;