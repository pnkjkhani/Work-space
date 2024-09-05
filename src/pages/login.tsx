"use client"
import React, { useState, FormEvent, useEffect } from 'react';
import { Button, Flex, Container, Heading, Box, Text } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoginResponse } from './api/login';
import { LoginRequestBody } from './api/login';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequestBody>({
    email: '',
  });
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const loginResponse: LoginResponse = await response.json();

      if (response.ok) {
        setStatus({ message: loginResponse.message, isError: false });
        
        if (loginResponse.redirectTo) {
          // Redirect to the specified page (e.g., /verify)
          router.push(loginResponse.redirectTo);
        } else {
          // Redirect to dashboard or home page after successful login
          router.push('/dashboard');
        }
      } else {
        setStatus({ message: loginResponse.message, isError: true });
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
          <Heading size="5" mb="5" align="center">Login</Heading>
          {status && (
            <Text color={status.isError ? 'red' : 'green'} mb="3">
              {status.message}
            </Text>
          )}
          <Form.Root onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
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

              {/* Remove password field */}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>

              {/* Add signup link */}
              <Text align="center">
                Don't have an account?{' '}
                <Link href="/signup" style={{ color: '#6366f1', textDecoration: 'underline' }}>
                  Sign up
                </Link>
              </Text>

              {/* Add forgot password link */}
             
            </Flex>
          </Form.Root>
        </Container>
      </Box>
    </Flex>
  );
};

export default Login;
