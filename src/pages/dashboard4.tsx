import Header from "./components/Header";
import { Box, Flex, Grid } from "@radix-ui/themes";
import Steps from "./components/Steps";
import Info from "./components/Info";
import Footer from "./components/Footer";
import TriggerComponent from "./components/TriggersComponent";

const Dashboard4 = () => {
  return (
    <Box minHeight="100dvh" minWidth="100vw" p="9">
      <Flex direction="column" gap="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto" py="6"
        >
          <Header />
          <Steps />
        </Grid>
        <TriggerComponent />
        <Footer  nextRoute={null} prevRoute="/dashboard3"/>
      </Flex>
    </Box>
  );
};

export default Dashboard4;
