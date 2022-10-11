import { Container, createStyles, Group, Loader, Text } from "@mantine/core";
import { createMediaQuery } from "ui/createMediaQuery";
import { convertToTimeInterval } from "utils/convertToTimeInterval";
import { useSummary } from "websocket/useSummary";

type Props = {
  planterID: string;
};

export const Summary = ({ planterID }: Props) => {
  const { classes } = useStyles();

  const summary = useSummary(planterID);

  if (!summary) return <Loader />;

  return (
    <Container className={classes.container}>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Last Online:</Text>
        <Text>
          {summary.lastOnline
            ? convertToTimeInterval(summary.lastOnline)
            : "Never"}
        </Text>
      </Group>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Last Irrigation:</Text>
        <Text>
          {summary.lastIrrigated
            ? convertToTimeInterval(summary.lastIrrigated)
            : "Never"}
        </Text>
      </Group>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    [createMediaQuery(theme.breakpoints.xs)]: {
      width: "100%",
    },
  },
  data: {
    width: "250px",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    [createMediaQuery(theme.breakpoints.xs)]: {
      width: "100%",
    },
  },
}));
