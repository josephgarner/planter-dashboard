import {
  Button,
  Container,
  createStyles,
  Drawer,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import { createMediaQuery } from "../ui/createMediaQuery";
import { CommandTable } from "./details/CommandTable";
import { PlanterHeader } from "./details/PlanterHeader";
import { PlanterInfo } from "./details/PlanterInfo";
import { usePlantIDList } from "../context/PlanterContextProvider";
import { Controls } from "./details/Controls";
import { MoistureDoughnut } from "./graphs/MoistureDoughnut";
import { BatteryDoughnut } from "./graphs/BatteryDoughnut";
import { IrrigationGraph } from "./graphs/moistureGraph";

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
      lockScroll={true}
      classNames={{ drawer: classes.drawer }}
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
                <Group className={classes.headerButtonGroup}>
                  <PlanterHeader planterID={selectedPlanter} />
                  <Controls />
                </Group>
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
              <IrrigationGraph />
            </Group>
          </Group>
        </Container>
      )}
    </Drawer>
  );
};

const useStyles = createStyles((theme) => ({
  drawer: {
    overflowY: "scroll",
  },
  container: {
    flexDirection: "column",
    maxWidth: theme.breakpoints.lg,
  },
  header: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "left",
    [createMediaQuery(theme.breakpoints.sm)]: {
      justifyContent: "space-between",
      flexDirection: "row",
    },
  },
  headerButtonGroup: {
    flexDirection: "column",
  },
  info: {
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "stretch",
    [createMediaQuery(theme.breakpoints.sm)]: {
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
