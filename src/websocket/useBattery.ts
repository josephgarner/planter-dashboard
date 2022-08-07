import { useEffect, useState } from "react";
import { ClientEvents, PlnaterBattery } from "../types";
import { useManager } from "./useManager";

export const useBattery = (planterID: string) => {
  const [battery, setBattery] = useState<PlnaterBattery | null>(null);

  useEffect(() => {
    const socket = useManager();
    socket.emit(ClientEvents.BATTERY, planterID);
    socket.on(ClientEvents.BATTERY, (arg) => {
      if (arg) {
        setBattery(arg as PlnaterBattery);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return battery;
};
