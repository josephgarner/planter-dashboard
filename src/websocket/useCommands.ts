import { useEffect, useState } from "react";
import { ClientEvents, Command, PlnaterMoisture } from "../types";
import { useManager } from "./useManager";

export const useCommands = (planterID: string) => {
  const [commandHistory, setCommandHistory] = useState<Command[] | null>(null);

  useEffect(() => {
    const socket = useManager();
    socket.emit(ClientEvents.COMMANDS, planterID);
    socket.on(ClientEvents.COMMANDS, (arg) => {
      if (arg) {
        setCommandHistory(arg as Command[]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return commandHistory;
};
