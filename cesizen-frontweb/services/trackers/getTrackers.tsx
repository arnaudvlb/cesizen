import { Tracker } from "@/types/database/trackers";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getTrackers(): Promise<Tracker[]> {
  const res = await apiFetch("/api/trackers/me", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

  const data: Collection<Tracker> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}