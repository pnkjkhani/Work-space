import { CheckIcon } from "@radix-ui/react-icons";
import {
    Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  IconButton,
  Inset,
  ScrollArea,
  Strong,
  Text,
} from "@radix-ui/themes";
import React from "react";

const CollectionTable = () => {
  const items = [
    {
      id: 1,
      text: "Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.",
    },
    {
      id: 2,
      text: "Another example text for the second box.",
    },
    {
      id: 3,
      text: "Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.",
    },
    {
      id: 4,
      text: "Another example text for the second box.",
    },
    {
      id: 5,
      text: "Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.",
    },
    {
      id: 6,
      text: "Another example text for the second box.",
    },
    {
      id: 7,
      text: "Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.",
    },
    {
      id: 8,
      text: "Another example text for the second box.",
    },
    {
      id: 9,
      text: "Another example text for the second box.",
    },
    {
      id: 10,
      text: "Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.",
    },
    {
      id: 11,
      text: "Another example text for the second box.",
    },
    {
      id: 12,
      text: "Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.",
    },
    {
      id: 13,
      text: "Another example text for the second box.",
    },
    // Add more items as needed
  ];

  return (
    <Box>
      <Flex p="2" gap="2" direction="row" align="center">
        <IconButton radius="medium" variant="surface" size="1">
          <CheckIcon />
        </IconButton>
        <Heading as="h2" size="4">
          Select all collection
        </Heading>
      </Flex>
      <ScrollArea type="always" scrollbars="vertical" style={{ height: 325 }}>
        <Box p="2" pr="8">
          <Grid columns="repeat(5, 1fr)" gap="3" width="100%">
            {items.map((item) => (
              <Box key={item.id} maxWidth="240px" width="100%">
                <Card size="2" style={{ height: "100%" }}>
                  <Flex gap="2" direction="column" align="center">
                  <Avatar
                    size="4"
                    src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                    radius="full"
                    fallback="T"
                  />
                  <Text as="p" size="3">
                    <Strong>Winter Collection</Strong> 
                  </Text>
                  <Text as="p" size="3">
                    37 products
                  </Text>
                  </Flex>
                </Card>
              </Box>
            ))}
          </Grid>
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default CollectionTable;
