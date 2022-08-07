import { Container, createStyles, Group, Loader, Text } from "@mantine/core";
import { createMediaQuery } from "../../ui/createMediaQuery";
import { useSummary } from "../../websocket/useSummary";

type Props = {
  planterID: string;
};

export const Summary = ({ planterID }: Props) => {
  const { classes } = useStyles();

  const summary = useSummary(planterID);

  if (!summary) return <Loader />;

  const timeSince = (date: Date) => {
    const then = new Date(date).getTime();
    const now = new Date().getTime();
    var seconds = Math.abs((now - then) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " Years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " Months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " Days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " Hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " Minutes";
    }
    return Math.floor(seconds) + " Seconds";
  };

  return (
    <Container className={classes.container}>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Last Online:</Text>
        <Text>
          {summary.lastOnline ? timeSince(summary.lastOnline) : "Never"}
        </Text>
      </Group>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Last Irrigation:</Text>
        <Text>
          {summary.lastIrrigated ? timeSince(summary.lastIrrigated) : "Never"}
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
