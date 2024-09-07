"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { verifyResponse } from "./api/verify";
import { VerifyRequestBody } from "./api/verify";
import { Box, Flex, Text, Button, TextField, Card } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

const VerifyPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<VerifyRequestBody>({
    email: "",
    verificationCode: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.verificationCode.trim()) {
      setError("Email and verification code are required");
      return;
    }

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData: verifyResponse = await response.json();

      if (response.ok) {
        setSuccess(responseData.message);
        // Save email to localStorage
        localStorage.setItem("userEmail", formData.email);
        // Redirect to dashboard after successful verification
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      minWidth="100vw"
    >
      <Card variant="surface" size="5">
        <Box>
          <Text as="label" size="3" weight="bold" align="center">
            Verify your account
          </Text>
        </Box>
        {error && <Text color="red">{error}</Text>}
        {success && <Text color="green">{success}</Text>}
        <Box width="100%">
          <Form.Root onSubmit={handleSubmit}>
            <Flex gap="2" direction="column" width="100%">
              <Form.Field name="email">
                <Form.Label>Email</Form.Label>
                <Form.Control asChild>
                  <TextField.Root
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name="verificationCode">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control asChild>
                  <TextField.Root
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    required
                    value={formData.verificationCode}
                    onChange={handleChange}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                <Button type="submit" variant="surface">
                  Verify
                </Button>
              </Form.Submit>
            </Flex>
          </Form.Root>
        </Box>
      </Card>
    </Flex>
  );
};

export default VerifyPage;
