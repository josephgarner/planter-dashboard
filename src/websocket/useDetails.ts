import { useEffect, useState } from "react";
import { ClientEvents, PlanterDetails } from "../types";
import { useManager } from "./useManager";

export const useDetails = (planterID: string) => {
  const [details, setDetails] = useState<PlanterDetails | null>(null);

  useEffect(() => {
    const socket = useManager();
    socket.emit(ClientEvents.DETAILS, planterID);
    socket.on(ClientEvents.DETAILS, (arg) => {
      if (arg) {
        setDetails(arg as PlanterDetails);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return details;
};
