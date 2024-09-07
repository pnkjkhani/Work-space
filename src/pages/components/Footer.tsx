import { Button, Flex, Grid } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const Footer = ({ nextRoute, prevRoute }: { nextRoute: string | null; prevRoute: string | null }) => {
  const history = useNavigate();

  return (
    <Flex gap="3" align="stretch" justify="end">
      <Grid columns="8" gap="3" width="auto">
        {prevRoute && (
          <Button
            size="3"
            variant="surface"
            color="gray"
            style={{ gridColumn: "span 3" }}
            onClick={() => history(prevRoute)}
          >
            Back
          </Button>
        )}
        {nextRoute && (
          <Button
            size="3"
            variant="surface"
            style={{ gridColumn: "span 5" }}
            onClick={() => history(nextRoute)}
          >
            Next
          </Button>
        )}
      </Grid>
    </Flex>
  );
};

export default Footer;
