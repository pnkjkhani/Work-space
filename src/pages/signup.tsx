import React, { useState } from 'react';
import { Button, Flex, Container, Heading, Box } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #6366f1, #a855f7)' }}>
      <Box
        style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Container size="1">
          <Heading size="5" mb="5" align="center">Sign Up</Heading>
          <Form.Root onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Form.Field name="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    required
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    name="firstName"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                  />
                </Form.Control>
                <Form.Message match="valueMissing">Please enter your first name</Form.Message>
              </Form.Field>

              <Form.Field name="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    required
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                  />
                </Form.Control>
                <Form.Message match="valueMissing">Please enter your last name</Form.Message>
              </Form.Field>

              <Form.Field name="email">
                <Form.Label>Email</Form.Label>
                <Form.Control asChild>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                  />
                </Form.Control>
                <Form.Message match="valueMissing">Please enter your email</Form.Message>
                <Form.Message match="typeMismatch">Please enter a valid email</Form.Message>
              </Form.Field>

              <Form.Submit asChild>
                <Button type="submit" style={{ width: '100%' }}>Sign Up</Button>
              </Form.Submit>
            </Flex>
          </Form.Root>
        </Container>
      </Box>
    </Flex>
  );
};

export default SignUp;
