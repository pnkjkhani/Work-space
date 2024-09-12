import {
  Box,
  Flex,
  Grid,
  Select,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React from "react";

const Info = () => {
  return (
    <Flex gap="4" direction="column">
      <Grid columns="3" gap="3" width="auto">
        <Box>
          <TextField.Root placeholder="Quize name" size="3"></TextField.Root>
        </Box>
        <Select.Root size="3" defaultValue="Exprience type">
          <Select.Trigger />
          <Select.Content align="center" variant="soft">
            <Select.Group>
              <Select.Item value="Exprience type" disabled>
                Exprience type
              </Select.Item>
              <Select.Separator />
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Separator />
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Separator />
              <Select.Item value="grape">Grape</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Select.Root size="3" defaultValue="Quize type">
          <Select.Trigger />
          <Select.Content align="center" variant="soft">
            <Select.Group>
              <Select.Item value="Quize type" disabled>
                Quize type
              </Select.Item>
              <Select.Separator />
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Separator />
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Separator />
              <Select.Item value="grape">Grape</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Grid>
      <TextArea
        resize="vertical"
        variant="surface"
        radius="medium"
        size="3"
        placeholder="Question"
      />
    </Flex>
  );
};

export default Info;
