import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useState } from 'react';
import CartSideBar from "./CartSideBar"

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar className='navBar'  variant="dark" expand="lg">
        <Container>
          <Navbar.Brand ><i class="fa-solid fa-cash-register"></i> E-COMMERCE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
              <Nav.Link onClick={handleShow} ><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
              <CartSideBar show={show} handleClose={handleClose} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;