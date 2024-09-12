"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Grid,
  Select,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import ProductSelectionTable from "./ProductsSelection";

const Scope = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Flex gap="4" direction="column">
      <Grid columns="4" gap="3" width="auto">
        <Select.Root size="3" >
          <Select.Trigger />
          <Select.Content align="center" variant="soft">
            <Select.Group>
              <Select.Item value="Select Products" disabled>
                Experience type
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
        <TextField.Root
          size="3"
          placeholder="Search the docs…"
          style={{ gridColumn: "span 2" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button size="3" variant="surface" color="gray" style={{ gridColumn: "span 1" }}>
          Search
        </Button>
      </Grid>
      <ProductSelectionTable searchQuery={searchQuery} />
    </Flex>
  );
};

export default Scope;
