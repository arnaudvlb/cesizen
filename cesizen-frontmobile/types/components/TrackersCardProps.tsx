import { Href } from "expo-router";
import { Tracker } from "../database/trackers";

export type TrackersCardProps = {
  trackers: Tracker[];
  onDelete: Href;
};
