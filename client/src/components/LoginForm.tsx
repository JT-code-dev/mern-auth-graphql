import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  // ✅ State to track form inputs
  const [formState, setFormState] = useState({ email: '', password: '' });

  // ✅ State to handle errors
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ✅ GraphQL Mutation
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

  // ✅ Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // ✅ Handle form submission
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
    <Form onSubmit={handleFormSubmit}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
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
        />
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  );
};

export default LoginForm;

