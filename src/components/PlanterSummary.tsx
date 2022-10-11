import { createStyles, Group, Paper, Transition } from "@mantine/core";
import { usePlantIDList } from "../context/PlanterContextProvider";
import { createMediaQuery } from "../ui/createMediaQuery";
import { BatteryBar } from "./graphs/BatteryBar";

import { PlanterHeader } from "./details/PlanterHeader";
import { Summary } from "./details/Summary";
import { MoistureDoughnut } from "./graphs/MoistureDoughnut";

type Props = {
  openDetails: (open: boolean) => void;
  planterID: string;
};

export const PlanterSummary = ({ openDetails, planterID }: Props) => {
  const { classes } = useStyles();
  const { setPlanter } = usePlantIDList();

  return (
    <Paper
      onClick={() => {
        setPlanter(planterID);
        openDetails(true);
      }}
      className={classes.paper}
      radius="lg"
      p="md"
      withBorder
    >
      <Group className={classes.wrapper} spacing={0}>
        <Group className={classes.content} spacing={0}>
          <PlanterHeader planterID={planterID} />
          <Summary planterID={planterID} />
        </Group>
        <MoistureDoughnut planterID={planterID} />
      </Group>
      <BatteryBar planterID={planterID} />
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  paper: {
    width: "100%",
    [createMediaQuery(theme.breakpoints.xs)]: {
      width: "400px",
    },
  },
  wrapper: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginBottom: theme.spacing.sm,
    [createMediaQuery(theme.breakpoints.xs)]: {
      flexDirection: "row",
    },
  },
  content: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "nowrap",
    [createMediaQuery(theme.breakpoints.xs)]: {
      alignItems: "flex-start",
    },
  },
  badge: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
}));
