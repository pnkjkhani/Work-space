import React, { useState } from 'react';
import { Button, TextField, Flex, Box, Text } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Box css={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Text as="h1" css={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Sign Up</Text>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <Box>
            <Label htmlFor="firstName">First Name</Label>
            <TextField
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Label htmlFor="lastName">Last Name</Label>
            <TextField
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Label htmlFor="email">Email</Label>
            <TextField
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
          <Button type="submit">Sign Up</Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SignUp;
