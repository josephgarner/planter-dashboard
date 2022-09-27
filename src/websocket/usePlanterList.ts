import { useEffect, useState } from "react";
import { ClientEvents, PlnaterBattery } from "../types";
import { useManager } from "./useManager";

export const usePlanterList = () => {
  const [planterList, setPlanterList] = useState<string[]>([]);

  useEffect(() => {
    const socket = useManager();
    socket.emit(ClientEvents.PLANTER_LIST);
    socket.on(ClientEvents.PLANTER_LIST, (arg) => {
      if (arg) {
        setPlanterList(arg[0]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return planterList;
};
