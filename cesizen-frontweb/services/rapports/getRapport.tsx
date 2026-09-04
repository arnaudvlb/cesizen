import { Rapport } from "@/types/database/rapports";
import { apiFetch } from "../apiFetch";

export default async function getRapport(id: string): Promise<Rapport> {
  const res = await apiFetch(`/api/rapports/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Rapport = await res.json();

  return data;
}
