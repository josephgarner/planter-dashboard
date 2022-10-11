import { Container, createStyles, Group, Paper, Title } from "@mantine/core";
import { useState } from "react";
import { PlanterDetails } from "./components/PlanterDetails";
import { PlanterSummary } from "./components/PlanterSummary";
import { usePlantIDList } from "./context/PlanterContextProvider";
import { Transition } from "@mantine/core";

export const AppRoot = () => {
  const [open, setOpen] = useState(false);
  const { planters } = usePlantIDList();
  const { classes } = useStyles();
  return (
    <Transition
      mounted={planters.length > 0}
      transition="pop"
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <Group style={{ ...styles }} className={classes.container}>
          {planters.map((p, index) => {
            return (
              <PlanterSummary key={index} planterID={p} openDetails={setOpen} />
            );
          })}
          <PlanterDetails open={open} setOpen={setOpen} />
        </Group>
      )}
    </Transition>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    minWidth: "100vw",
    padding: theme.spacing.md,
  },
}));
