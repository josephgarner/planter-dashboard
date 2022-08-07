import { createStyles, Group, Paper, Text } from "@mantine/core";

export const PlanterInfo = () => {
  const { classes } = useStyles();
  return (
    <Paper radius="lg" p="md" withBorder className={classes.dataContainer}>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Last Online:</Text>
        <Text>5 Hours Ago</Text>
      </Group>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Last Irrigated:</Text>
        <Text>5 Hours Ago</Text>
      </Group>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Date Planted:</Text>
        <Text>3 Days Ago</Text>
      </Group>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Age:</Text>
        <Text>3 Days old</Text>
      </Group>
      <Group className={classes.data} spacing={"sm"}>
        <Text weight="bold">Last Online:</Text>
        <Text>5 Hours Ago</Text>
      </Group>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  dataContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  data: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
}));
