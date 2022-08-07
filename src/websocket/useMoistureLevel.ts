import { useEffect, useState } from "react";
import { ClientEvents, PlnaterMoisture } from "../types";
import { useManager } from "./useManager";

export const useMoistureLevel = (planterID: string) => {
  const [moisture, setMoisture] = useState<PlnaterMoisture | null>(null);

  useEffect(() => {
    const socket = useManager();
    socket.emit(ClientEvents.REPORT, planterID);
    socket.on(ClientEvents.REPORT, (arg) => {
      if (arg) {
        setMoisture(arg as PlnaterMoisture);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return moisture;
};
