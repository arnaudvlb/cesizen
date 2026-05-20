import { Tracker } from "@/types/database/trackers";

export default async function getRapport(
  id: string
): Promise<Tracker> {
  const res = await fetch(`/api/trackers/${id}`, {
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