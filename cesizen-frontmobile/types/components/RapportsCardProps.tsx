import { Href } from "expo-router";
import { Rapport } from "../database/rapports";

export type RapportsCardProps = {
  rapports: Rapport[];
  onDelete: Href;
};
