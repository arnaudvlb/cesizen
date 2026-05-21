import { Tracker } from "@/types/database/trackers";
import { Rapport } from "@/types/database/rapports";

export type TrackerDetailsProps = {
  tracker: Tracker;
  rapports: Rapport[];
};