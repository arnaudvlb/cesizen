import { Role } from "@/types/database/roles";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getRoles(): Promise<Role[]> {
  const res = await apiFetch("/api/roles_utilisateurs", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

  const data: Collection<Role> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}
