import { Box, Card, Grid, Strong, Text, Flex } from "@radix-ui/themes";
import React from "react";

const TriggerComponent = () => {
  return (
    <Grid columns="4" gap="3" rows="auto" width="auto">
      <Card size="3" variant="surface">
        <Flex justify="center" align="center" height="100%" gap="3" direction="column">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
          <Text as="p" size="3">
            <Strong>Stand Alone</Strong>
          </Text>
          <Text>The quick brown fox jumps over .</Text>
        </Flex>
      </Card>
      <Card size="3" variant="surface">
        <Flex justify="center" align="center" height="100%" gap="3" direction="column">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
          <Text as="p" size="3">
            <Strong>Stand Alone</Strong>
          </Text>
          <Text>The quick brown fox jumps over .</Text>
        </Flex>
      </Card>
      <Card size="3" variant="surface">
        <Flex justify="center" align="center" height="100%" gap="3" direction="column">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
          <Text as="p" size="3">
            <Strong>Stand Alone</Strong>
          </Text>
          <Text>The quick brown fox jumps over .</Text>
        </Flex>
      </Card>
      <Card size="3" variant="surface">
        <Flex justify="center" align="center" height="100%" gap="3" direction="column">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
          <Text as="p" size="3">
            <Strong>Stand Alone</Strong>
          </Text>
          <Text>The quick brown fox jumps over .</Text>
        </Flex>
      </Card>
      
    </Grid>
  );
};

export default TriggerComponent;
