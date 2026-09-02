import { Tracker } from "@/types/database/trackers";
import { apiFetch } from "../apiFetch";

export default async function getTracker(id: string): Promise<Tracker> {
  const res = await apiFetch(`/api/trackers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Tracker = await res.json();

  return data;
}
