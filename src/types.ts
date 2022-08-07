export type PlanterSummary = {
  planterID: string;
  planterTitle?: string | null;
  online: boolean;
  lastOnline: Date | null;
  irrigating: boolean;
  lastIrrigated: Date | null;
};

export type PlnaterBattery = {
  planterID: string;
  charge: number;
  dateReceived?: Date;
};

export type PlnaterMoisture = {
  planterID: string;
  moisturePercentage: number;
  irrigating: boolean;
  dateReceived?: Date;
};

export enum ClientEvents {
  PLANTER_LIST = "planter_list",
  REPORT = "report",
  IRRIGATION_HISTORY = "irrigation_history",
  SUMMARY = "summary",
  COMMANDS = "commands",
  UPDATE = "update",
  PLANTS = "plants",
  SEND_COMMAND = "send_command",
  BATTERY = "battery",
}
