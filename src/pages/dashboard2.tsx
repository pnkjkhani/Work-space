import Header from "./components/Header";
import { Box, Flex, Grid } from "@radix-ui/themes";
import Steps from "./components/Steps";
import Info from "./components/Info";
import Footer from "./components/Footer";
import Scope from "./components/Scope";

const Dashboard = () => {
  return (
    <Box minHeight="100dvh" minWidth="100vw" p="9">
      <Flex direction="column" gap="4">
        <Grid
          columns={{ initial: "1", md: "2" }}
          gap="3"
          width="auto"
        >
          <Header />
          <Steps />
        </Grid>
        {/* <Info /> */}
        <Scope />
        <Footer nextRoute="/dashboard3" prevRoute="/dashboard"/>
      </Flex>
    </Box>
  );
};

export default Dashboard;
