import React, { ReactNode } from "react";
import Header from "./components/Header";
import { Box } from "@radix-ui/themes";
import Steps from "./components/Steps";

const Dashboard = () => {
  return (
    <Box minHeight="100dvh" minWidth="100vw" pt="9" pl="9">
      <Header />
      <Steps />
      <main />
    </Box>
  );
};

export default Dashboard;
