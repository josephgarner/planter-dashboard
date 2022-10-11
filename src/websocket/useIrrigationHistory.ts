import { useEffect, useState } from "react";
import { ClientEvents, PlnaterMoisture } from "../types";
import { useManager } from "./useManager";

export const useIrrigationHistory = (planterID: string) => {
  const [moistureHistory, setMoistureHistory] = useState<
    PlnaterMoisture[] | null
  >(null);

  useEffect(() => {
    const socket = useManager();
    socket.emit(ClientEvents.IRRIGATION_HISTORY, planterID);
    socket.on(ClientEvents.IRRIGATION_HISTORY, (arg) => {
      if (arg) {
        setMoistureHistory(arg as PlnaterMoisture[]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return moistureHistory;
};
