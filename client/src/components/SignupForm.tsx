import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { setToken } from '../utils/auth';

const SignupForm = () => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  // Apollo Mutation Hook for adding a user
  const [addUser, { error }] = useMutation(ADD_USER);

  // Handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userFormData.username || !userFormData.email || !userFormData.password) {
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      if (data?.addUser?.token) {
        setToken(data.addUser.token); // Save token
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset form
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert || !!error} variant='danger'>
          {error ? error.message : 'Something went wrong with your signup!'}
        </Alert>

        <Form.Group className="mb-3">
  <Form.Label htmlFor="username">Username</Form.Label>
  <Form.Control
    id="username" // Add ID
    type="text"
    placeholder="Your username"
    name="username"
    autoComplete="off" // Add this
    onChange={handleInputChange}
    value={userFormData.username}
    required
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label htmlFor="email">Email</Form.Label>
  <Form.Control
    id="email" // Add ID
    type="email"
    placeholder="Your email address"
    name="email"
    autoComplete="off" // 
    onChange={handleInputChange}
    value={userFormData.email}
    required
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label htmlFor="password">Password</Form.Label>
  <Form.Control
    id="password" // Add ID
    type="password"
    placeholder="Your password"
    name="password"
    autoComplete="off" 
    onChange={handleInputChange}
    value={userFormData.password}
    required
  />
</Form.Group>

        
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
