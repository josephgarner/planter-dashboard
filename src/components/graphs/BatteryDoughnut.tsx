import { createStyles, Loader, RingProgress, Text } from "@mantine/core";
import { GiBatteryPack } from "react-icons/gi";
import { useBattery } from "../../websocket/useBattery";

type Props = {
  planterID: string;
};

export const BatteryDoughnut = ({ planterID }: Props) => {
  const { classes } = useStyles();
  const battery = useBattery(planterID);

  if (!battery) return <Loader />;
  return (
    <RingProgress
      roundCaps
      sections={[
        {
          value: battery.charge,
          color: `${
            battery.charge > 60
              ? "teal"
              : battery.charge > 30
              ? "yellow"
              : "red"
          }`,
        },
      ]}
      label={
        <Text
          className={classes.text}
          color={
            battery.charge > 60
              ? "teal"
              : battery.charge > 30
              ? "yellow"
              : "red"
          }
          weight={700}
          align="center"
          size="xl"
        >
          <GiBatteryPack />
          {battery.charge}%
        </Text>
      }
    />
  );
};

const useStyles = createStyles(() => ({
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
