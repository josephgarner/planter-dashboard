import { createStyles, Loader, Paper, Table } from "@mantine/core";
import { usePlantIDList } from "context/PlanterContextProvider";
import { format } from "date-fns";
import { useEffect } from "react";
import { useCommands } from "websocket/useCommands";

export const CommandTable = () => {
  const { classes } = useStyles();
  const { selectedPlanter } = usePlantIDList();

  const commandList = useCommands(selectedPlanter!);

  if (!commandList) return <Loader />;

  const rows = commandList.map((command, index) => (
    <tr key={index}>
      <td>{command.issuedCommand}</td>
      <td>{command.sent ? "Sent" : "Waiting"}</td>
      <td>{command.actioned ? "Actioned" : "Waiting"}</td>
      <td>{format(new Date(command.dateCreated), "yy/MM/dd HH:mm")}</td>
    </tr>
  ));

  return (
    <Paper radius="lg" p="md" withBorder className={classes.dataContainer}>
      <Table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Send</th>
            <th>Actioned</th>
            <th>Date Issueds</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
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
}));
