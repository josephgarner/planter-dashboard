import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoot } from "./AppRoot";
import { MantineProvider } from "@mantine/core";
import { PlanterContextProvider } from "./context/PlanterContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <PlanterContextProvider>
        <AppRoot />
      </PlanterContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
