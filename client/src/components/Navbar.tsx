import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { getToken, removeToken } from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const AppNavbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken());

  const { data } = useQuery(GET_ME, {
    skip: !getToken(),
  });

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [data, isLoggedIn]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">📚 Google Books Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Search for Books</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/saved">See Your Books</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>  {/* ✅ Separate Login */}
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>  {/* ✅ New Sign-Up Link */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
