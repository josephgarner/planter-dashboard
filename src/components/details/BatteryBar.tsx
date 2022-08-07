import { Loader, Progress } from "@mantine/core";
import { useBattery } from "../../websocket/useBattery";

type Props = {
  planterID: string;
};

export const BatteryBar = ({ planterID }: Props) => {
  const battery = useBattery(planterID);

  if (!battery) return <Loader />;

  return (
    <Progress
      size="lg"
      color={
        battery.charge > 60 ? "teal" : battery.charge > 30 ? "yellow" : "red"
      }
      value={battery.charge}
    />
  );
};
