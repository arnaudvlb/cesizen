import { Rapport } from "@/types/database/rapports";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getRapports(): Promise<Rapport[]> {
  const res = await apiFetch("/api/rapports/me", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

  const data: Collection<Rapport> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}