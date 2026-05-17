import { Rapport } from "@/types/database/rapports";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getRapports(): Promise<Rapport[]> {
  const res = await fetch("/api/rapports/me", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

  const data: Collection<Rapport> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}