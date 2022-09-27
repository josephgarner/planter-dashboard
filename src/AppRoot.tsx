import { Container, createStyles, Group, Paper, Title } from "@mantine/core";
import { useState } from "react";
import { PlanterDetails } from "./components/PlanterDetails";
import { PlanterSummary } from "./components/PlanterSummary";
import { usePlantIDList } from "./context/PlanterContextProvider";

export const AppRoot = () => {
  const [open, setOpen] = useState(false);
  const { planters } = usePlantIDList();
  const { classes } = useStyles();
  return (
    <Group className={classes.container}>
      {planters.map((p, index) => {
        return (
          <PlanterSummary key={index} planterID={p} openDetails={setOpen} />
        );
      })}
      <PlanterDetails open={open} setOpen={setOpen} />
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    minWidth: "100vw",
    padding: theme.spacing.md,
  },
}));
