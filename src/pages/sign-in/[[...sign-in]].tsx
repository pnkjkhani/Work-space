'use client'
import React, { useState, FormEvent, useEffect } from "react";
import {
  Button,
  Flex,
  Container,
  Heading,
  Text,
  Link,
  Card,
  TextField,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ClerkAPIError } from '@clerk/types'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [errors, setErrors] = React.useState<ClerkAPIError[]>()
  const [formData, setFormData] = useState({
    email: "",
  });
  const [status, setStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    setErrors(undefined)

    if (!isLoaded) {
      return
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: formData.email,
      })  // This is mainly for debugging while developing.

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId })
        router.push('/dashboard')
      }

      if (completeSignIn.status === 'complete') {
        setStatus({ message: "sign in successful", isError: false });
        await setActive({ session: completeSignIn.createdSessionId })
        router.push('/dashboard')
      } else {
        setStatus({ message: "Something went wrong", isError: true });
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors)
      console.error(JSON.stringify(err, null, 2))
    }finally {
      setIsSubmitting(false);
    }
  }

  // Display a form to capture the user's email and password
  return (
    <Flex align="center" justify="center" minHeight="100vh" width="100vw">
      <Card variant="surface" size="5">
        <Container size="4">
          <Heading size="5" mb="5" align="center">
            Login
          </Heading>
          {status && (
            <Text color={status.isError ? "red" : "green"} mb="3">
              {status.message}
            </Text>
          )}
          <Form.Root onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Form.Field name="email">
                <Form.Label>Email</Form.Label>
                <Form.Control asChild>
                  <TextField.Root
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    radius="medium"
                    size="3"
                    style={{
                      width: "100%",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </Form.Control>
                <Form.Message match="valueMissing">
                  Please enter your email
                </Form.Message>
                <Form.Message match="typeMismatch">
                  Please enter a valid email
                </Form.Message>
              </Form.Field>

              <Button type="submit" disabled={isSubmitting} variant="surface">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <Flex gap="2">
                <Text align="center">Don't have an account? </Text>
                <Button variant="surface">
                  <Link underline="none" href="/signup">
                    Sign up
                  </Link>
                </Button>
              </Flex>
            </Flex>
          </Form.Root>
        </Container>
      </Card>
    </Flex>
  );
}