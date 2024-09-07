import { Button, Flex, Grid } from "@radix-ui/themes";
const Footer = () => {
  return (
    <Flex gap="3" align="stretch" justify="end">
      <Grid columns="8" gap="3" width="auto">
        <Button
          size="3"
          variant="surface"
          color="gray"
          style={{ gridColumn: "span 3" }}
        >
          Back
        </Button>
        <Button size="3" variant="surface" style={{ gridColumn: "span 5" }}>
          Next
        </Button>
      </Grid>
    </Flex>
  );
};

export default Footer;
