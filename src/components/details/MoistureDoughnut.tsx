import { createStyles, Loader, RingProgress, Text } from "@mantine/core";
import { MdWaterDrop } from "react-icons/md";
import { useMoistureLevel } from "../../websocket/useMoistureLevel";

type Props = {
  planterID: string;
};

export const MoistureDoughnut = ({ planterID }: Props) => {
  const { classes } = useStyles();

  const mositure = useMoistureLevel(planterID);

  if (!mositure) return <Loader />;

  return (
    <RingProgress
      sections={[{ value: mositure.moisturePercentage, color: "blue" }]}
      roundCaps
      label={
        <Text
          className={classes.text}
          color="blue"
          weight={700}
          align="center"
          size="xl"
        >
          <MdWaterDrop />
          {mositure.moisturePercentage}%
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
