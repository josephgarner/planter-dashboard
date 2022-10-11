import {
  Button,
  createStyles,
  Group,
  Loader,
  NumberInput,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { usePlantIDList } from "context/PlanterContextProvider";
import { useState } from "react";
import { convertToTimeInterval } from "utils/convertToTimeInterval";
import { useDetails } from "websocket/useDetails";
import { useForm } from "@mantine/form";
import { useUpdate } from "websocket/useUpdate";
import { FaPencilRuler, FaSave } from "react-icons/fa";
import { showNotification } from "@mantine/notifications";
import { successNotificationProps } from "utils/successNotificationProps";

export const PlanterInfo = () => {
  const { classes } = useStyles();
  const [edit, setEdit] = useState(false);
  const { selectedPlanter } = usePlantIDList();
  const details = useDetails(selectedPlanter!!);

  const form = useForm({
    initialValues: {
      upperLimit: 0,
      lowerLimit: 0,
      planterTitle: "",
    },

    validate: {},
  });

  return (
    <Paper radius="lg" p="md" withBorder className={classes.dataContainer}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => {
          const updateDetails = {
            upperLimit:
              values.upperLimit > 0 && values.upperLimit !== details?.upperLimit
                ? values.upperLimit
                : details!.upperLimit,
            lowerLimit:
              values.lowerLimit > 0 && values.lowerLimit !== details?.lowerLimit
                ? values.lowerLimit
                : details!.lowerLimit,
            planterTitle:
              values.planterTitle &&
              values.planterTitle !== details?.planterTitle
                ? values.planterTitle
                : details!.planterTitle,
          };
          useUpdate(selectedPlanter!, updateDetails);
          showNotification({
            title: "Planter details updated",
            message:
              "Your settings have been saved and will be used by the planter in the future",
            ...successNotificationProps,
          });
        })}
      >
        <Group className={classes.data} spacing={"sm"}>
          <Text weight="bold">Upper Limit:</Text>
          <Text>{details?.upperLimit}%</Text>
          {edit ? (
            <NumberInput
              name="upperLimit"
              size="xs"
              radius="lg"
              hideControls
              {...form.getInputProps("upperLimit")}
            />
          ) : null}
        </Group>
        <Group className={classes.data} spacing={"sm"}>
          <Text weight="bold">Lower Limit:</Text>
          <Text>{details?.lowerLimit}%</Text>
          {edit ? (
            <NumberInput
              name="lowerLimit"
              size="xs"
              radius="lg"
              hideControls
              {...form.getInputProps("lowerLimit")}
            />
          ) : null}
        </Group>
        <Group className={classes.data} spacing={"sm"}>
          <Text weight="bold">Label:</Text>
          <Text>{details?.planterTitle}</Text>
          {edit ? (
            <TextInput
              name="planterTitle"
              placeholder={details?.planterTitle ? details?.planterTitle : ""}
              size="xs"
              radius="lg"
              {...form.getInputProps("planterTitle")}
            />
          ) : null}
        </Group>
        <Group className={classes.data} spacing={"sm"}>
          <Text weight="bold">ID:</Text>
          <Text>{details?.planterID}</Text>
        </Group>
        <Group className={classes.data} spacing={"sm"}>
          <Text weight="bold">Age:</Text>
          <Text>{convertToTimeInterval(details?.dateCreated!)}</Text>
        </Group>
        {!edit ? (
          <Button
            type="submit"
            variant="outline"
            radius="lg"
            leftIcon={<FaPencilRuler />}
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="outline"
            radius="lg"
            leftIcon={<FaSave />}
            onClick={() => setEdit(false)}
          >
            Save
          </Button>
        )}
      </form>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dataContainer: {
    width: "100%",
  },
  data: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
}));
