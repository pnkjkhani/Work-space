import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text, Button, Heading } from "@radix-ui/themes";

const Header = () => {
  return (

      <Box width="100%">
        <Flex align="center" gap="4">
          <ArrowLeftIcon/>
          <Box>
            <Heading as="h1" size="8" weight="medium">
              Create Experience
            </Heading>
            <Text >
              Rhoncus morbi et augue nec, in id ullamcorper at sit.
            </Text>
          </Box>
        </Flex>

        {/* Steps Navigation */}
        
      </Box>

  );
};
export default Header;
