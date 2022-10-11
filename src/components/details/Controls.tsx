import { Button, Group } from "@mantine/core";
import { usePlantIDList } from "context/PlanterContextProvider";
import { CommandType } from "types";
import { useSendCommand } from "websocket/useSendCommand";
import { MdWaterDrop } from "react-icons/md";
import { FaStopCircle } from "react-icons/fa";
import { showNotification } from "@mantine/notifications";
import { successNotificationProps } from "utils/successNotificationProps";

export const Controls = () => {
  const { selectedPlanter } = usePlantIDList();

  return (
    <Group>
      <Button
        variant="outline"
        radius="lg"
        leftIcon={<MdWaterDrop />}
        onClick={() => {
          useSendCommand(selectedPlanter!, CommandType.IRRIGATE);
          showNotification({
            title: "Command sent",
            message:
              "Irrigation command sent, your planter will water on next wake.",
            ...successNotificationProps,
          });
        }}
      >
        Irrigate
      </Button>
      <Button
        variant="outline"
        radius="lg"
        leftIcon={<FaStopCircle />}
        color="red"
        onClick={() => {
          useSendCommand(selectedPlanter!, CommandType.STOP_IRRIGATE);
          showNotification({
            title: "Command sent",
            message: "Irrigation will stop soon.",
            ...successNotificationProps,
          });
        }}
      >
        Stop Irrigating
      </Button>
    </Group>
  );
};
