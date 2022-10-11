import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoot } from "./AppRoot";
import { MantineProvider } from "@mantine/core";
import { PlanterContextProvider } from "./context/PlanterContextProvider";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ white: "#CED4DA", colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <PlanterContextProvider>
          <AppRoot />
        </PlanterContextProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
