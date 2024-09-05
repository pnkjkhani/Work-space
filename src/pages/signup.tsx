"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, Flex, Container, Heading, Box, Text } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { UserInput } from './api/signup';
import { useRouter } from 'next/router';
import { SignUpResponse } from './api/signup';
import Link from 'next/link';

const SignUp: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      router.push('/dashboard');
    }
  }, [router]);

  const [formData, setFormData] = useState<UserInput>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response: Response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const signUpApiResponse: SignUpResponse = await response.json();
      console.log(signUpApiResponse);
      if (response.ok) {
        setStatus({ message: signUpApiResponse.message, isError: false });
        setFormData({ firstName: '', lastName: '', email: '' }); // Reset form
        // Redirect to verify page
        router.push('/verify');
      } else {
        setStatus({ message: signUpApiResponse.message, isError: true });
      }
    } catch (error) {
      setStatus({ message: 'An error occurred. Please try again.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
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
          {status && (
            <Text color={status.isError ? 'red' : 'green'} mb="3">
              {status.message}
            </Text>
          )}
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
                <Button type="submit" style={{ width: '100%' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </Form.Submit>

              <Text align="center">
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#6366f1', textDecoration: 'underline' }}>
                  Sign in
                </Link>
              </Text>
            </Flex>
          </Form.Root>
        </Container>
      </Box>
    </Flex>
  );
};

export default SignUp;
