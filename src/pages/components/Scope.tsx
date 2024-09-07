import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Grid,
  Select,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React from "react";
import ProductSelectionTable from "./ProductsSelection";

const Scope = () => {
  return (
    <Flex gap="4" direction="column">
      <Grid columns="5" gap="3" width="auto">
        <Select.Root size="3" defaultValue="Select Products">
          <Select.Trigger />
          <Select.Content align="center" variant="soft">
            <Select.Group>
              <Select.Item value="Select Products" disabled>
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
        <TextField.Root size="3" placeholder="Search the docs…" >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button size="3" variant="surface" color="gray">
          Search
        </Button>
      </Grid>
      <ProductSelectionTable />
    </Flex>
  );
};

export default Scope;
