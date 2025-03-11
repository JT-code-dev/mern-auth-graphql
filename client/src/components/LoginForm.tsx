import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  // state to track form inputs
  const [formState, setFormState] = useState({ email: '', password: '' });

  // State to handle errors
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // GraphQL Mutation
  const [login, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      setToken(data.login.token); // Save token to localStorage
      navigate('/'); // Redirect to homepage after login
      window.location.reload(); // Refresh navbar state
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Clear previous errors

    try {
      await login({ variables: { ...formState } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleFormSubmit} className="p-4 border rounded shadow">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                size="sm" // 👈 Makes the input smaller
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
                size="sm" // 👈 Makes the input smaller
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading} className="w-100">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}; 

export default LoginForm; 
