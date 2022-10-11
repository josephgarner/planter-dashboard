import { NotificationProps } from "@mantine/core";

export const successNotificationProps: NotificationProps = {
  radius: "lg",
  styles: (theme) => ({
    root: {
      backgroundColor: theme.colors.blue[6],
      borderColor: theme.colors.blue[6],

      "&::before": { backgroundColor: theme.white },
    },

    title: {
      color: theme.white,
      fontWeight: "bold",
      fontSize: theme.fontSizes.md,
    },
    description: { color: theme.white },
    closeButton: {
      color: theme.white,
      "&:hover": { backgroundColor: theme.colors.blue[7] },
    },
  }),
};
