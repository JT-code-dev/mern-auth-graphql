import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { getToken, removeToken } from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const AppNavbar = () => {
  const navigate = useNavigate();

  // Check if user is logged in using token
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken());

  // Apollo query to check user authentication
  const { data } = useQuery(GET_ME, {
    skip: !getToken(), // Skip query if no token
  });

  // Effect to update state when login status changes
  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [data, isLoggedIn]); // Updates when user logs in/out

  // Logout function
  const handleLogout = () => {
    removeToken(); // Clear the token from storage
    setIsLoggedIn(false); // Update state to refresh UI
    navigate('/'); // Redirect to home
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
              <Nav.Link as={Link} to="/login">Login/Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

