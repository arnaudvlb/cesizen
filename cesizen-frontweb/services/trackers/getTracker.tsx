import { Tracker } from "@/types/database/trackers";
import { apiFetch } from "../apiFetch";

export default async function getTracker(
  id: string
): Promise<Tracker> {
  const res = await apiFetch(`/api/trackers/${id}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: Tracker = await res.json();

  return data;
}