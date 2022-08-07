import { useEffect, useState } from "react";
import { ClientEvents, PlanterSummary } from "../types";
import { useManager } from "./useManager";

export const useSummary = (planterID: string) => {
  const [summary, setSummary] = useState<PlanterSummary | null>(null);

  useEffect(() => {
    const socket = useManager();
    socket.emit(ClientEvents.SUMMARY, planterID);
    socket.on(ClientEvents.SUMMARY, (arg) => {
      if (arg) {
        setSummary(arg as PlanterSummary);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return summary;
};
