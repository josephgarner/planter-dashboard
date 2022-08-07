import { Badge, createStyles, Group, Loader, Title } from "@mantine/core";
import { createMediaQuery } from "../../ui/createMediaQuery";
import { useSummary } from "../../websocket/useSummary";

type Props = {
  planterID: string;
};

export const PlanterHeader = ({ planterID }: Props) => {
  const { classes } = useStyles();

  const summary = useSummary(planterID);

  if (!summary) return <Loader />;

  return (
    <Group className={classes.wrapper} spacing="sm">
      <Title order={2}>
        {summary.planterTitle ? summary.planterTitle : summary.planterID}
      </Title>
      <Group>
        <Badge color={summary.online ? "green" : "red"} size="lg">
          {summary.online ? "Online" : "Offline"}
        </Badge>
        <Badge color={summary.irrigating ? "blue" : "orange"} size="lg">
          {summary.irrigating ? "Irrigating" : "Drying"}
        </Badge>
      </Group>
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    [createMediaQuery(theme.breakpoints.xs)]: {
      alignItems: "flex-start",
      marginBottom: 0,
    },
  },
}));
