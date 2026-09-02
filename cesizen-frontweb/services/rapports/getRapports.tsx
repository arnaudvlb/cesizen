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

  const data: Collection<Rapport> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}