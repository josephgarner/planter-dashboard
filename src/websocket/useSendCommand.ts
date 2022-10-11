import { useEffect, useState } from "react";
import { ClientEvents, CommandType, PlnaterBattery } from "../types";
import { useManager } from "./useManager";

export const useSendCommand = (planterID: string, command: CommandType) => {
  const socket = useManager();
  socket.emit(ClientEvents.SEND_COMMAND, { planterID, command });
  socket.off("connect");
  socket.off("disconnect");
  socket.off("pong");
};
