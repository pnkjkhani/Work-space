import { Button, Flex, Grid } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const Footer = ({
  nextRoute,
  prevRoute,
}: {
  nextRoute: string | null;
  prevRoute: string | null;
}) => {
  const router = useRouter();

  return (
    <Flex gap="3" align="stretch" justify="end">
      <Grid columns="8" gap="3" width="auto">
        {prevRoute && (
          <Button
            size="3"
            variant="surface"
            color="gray"
            style={{ gridColumn: "span 3" }}
            onClick={() => router.push(prevRoute)}
          >
            Back
          </Button>
        )}
        {nextRoute && (
          <Button
            size="3"
            variant="surface"
            style={{ gridColumn: "span 5" }}
            onClick={() => router.push(nextRoute)}
          >
            Next
          </Button>
        )}
      </Grid>
    </Flex>
  );
};

export default Footer;
