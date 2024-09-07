import { Button, Flex } from "@radix-ui/themes";
const Footer = () => {
  return (
    <Flex gap="3" align="stretch" justify="end">
      <Button size="3" variant="surface" color="gray">
        Back
      </Button>
      <Button size="3" variant="surface">
        Next
      </Button>
    </Flex>
  );
};

export default Footer;
