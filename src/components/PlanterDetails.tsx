import {
  Container,
  createStyles,
  Drawer,
  Group,
  Loader,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import { createMediaQuery } from "../ui/createMediaQuery";
import { BatteryDoughnut } from "./details/BatteryDoughnut";
import { MoistureDoughnut } from "./details/MoistureDoughnut";
import { CommandTable } from "./details/CommandTable";
import { PlanterHeader } from "./details/PlanterHeader";
import { PlanterInfo } from "./details/PlanterInfo";
import { usePlantIDList } from "../context/PlanterContextProvider";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const PlanterDetails = ({ open, setOpen }: Props) => {
  const { classes } = useStyles();

  const { selectedPlanter } = usePlantIDList();
  return (
    <Drawer
      opened={open}
      onClose={() => setOpen(false)}
      position="left"
      padding="xl"
      size="full"
    >
      {!selectedPlanter ? (
        <Loader />
      ) : (
        <Container>
          <Group className={classes.container}>
            <Paper
              radius="lg"
              p="md"
              withBorder
              className={classes.dataContainer}
            >
              <Group className={classes.header}>
                <PlanterHeader planterID={selectedPlanter} />
                <Group>
                  <MoistureDoughnut planterID={selectedPlanter} />
                  <BatteryDoughnut planterID={selectedPlanter} />
                </Group>
              </Group>
            </Paper>
            <Group className={classes.info}>
              <PlanterInfo />
              <CommandTable />
            </Group>
            <Group className={classes.info}>
              <Text>Moisture Graph</Text>
              <Text>Battery Graph</Text>
            </Group>
          </Group>
        </Container>
      )}
    </Drawer>
  );
};

const useStyles = createStyles((theme) => ({
  drawer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
    maxWidth: theme.breakpoints.lg,
  },
  header: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "left",
    [createMediaQuery(theme.breakpoints.xs)]: {
      justifyContent: "space-between",
      flexDirection: "row",
    },
  },
  info: {
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "stretch",
    [createMediaQuery(theme.breakpoints.xs)]: {
      flexDirection: "row",
      flexWrap: "nowrap",
    },
  },
  dataContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));
