import { ClientEvents, UpdatePlanterDetails } from "../types";
import { useManager } from "./useManager";

export const useUpdate = (planterID: string, details: UpdatePlanterDetails) => {
  const socket = useManager();
  socket.emit(ClientEvents.UPDATE, { planterID, details });
  socket.off("connect");
  socket.off("disconnect");
  socket.off("pong");
};
