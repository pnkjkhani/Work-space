import Header from "./components/Header";
import { Box, Flex, Grid } from "@radix-ui/themes";
import Steps from "./components/Steps";
import Info from "./components/Info";
import Footer from "./components/Footer";

const Dashboard = () => {
  return (
    <Box minHeight="100dvh" minWidth="100vw" p="9">
      <Flex direction="column" gap="4">
        <Grid
          columns={{ initial: "1", md: "2" }}
          gap="3"
          width="auto"
          py="6"

        >
          <Header />
          <Steps />
        </Grid>
        <Info />
        <Footer nextRoute="/dashboard2" prevRoute={null}/>
      </Flex>
    </Box>
  );
};

export default Dashboard;
