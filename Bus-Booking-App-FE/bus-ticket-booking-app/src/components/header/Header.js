import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '24px' }}>
          Ticketpedia.com
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/mytrips">My Trips</Nav.Link>
            {username ? (
              <>
                <Nav.Link>{`Hi, ${username}`}</Nav.Link>
                <Nav.Link as={Link} to="/">Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login/Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
