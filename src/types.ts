export type PlanterSummary = {
  planterID: string;
  planterTitle?: string | null;
  online: boolean;
  lastOnline: Date | null;
  irrigating: boolean;
  lastIrrigated: Date | null;
};

export type PlanterDetails = {
  planterID: string;
  planterTitle?: string | null;
  upperLimit: number | null;
  lowerLimit: number | null;
  dateCreated: Date;
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
  dateReceived: Date;
};

export type Command = {
  planterID: string;
  issuedCommand: string;
  sent: boolean;
  actioned: boolean;
  dateCreated: Date;
  dateUpdated: Date;
};

export enum ClientEvents {
  PLANTER_LIST = "planter_list",
  REPORT = "report",
  IRRIGATION_HISTORY = "irrigation_history",
  SUMMARY = "summary",
  DETAILS = "details",
  COMMANDS = "commands",
  UPDATE = "update",
  PLANTS = "plants",
  SEND_COMMAND = "send_command",
  BATTERY = "battery",
}

export enum CommandType {
  IRRIGATE = "IRRIGATE",
  STOP_IRRIGATE = "STOP_IRRIGATE",
}

export type UpdatePlanterDetails = {
  planterTitle?: string | null;
  upperLimit: number | null;
  lowerLimit: number | null;
};
