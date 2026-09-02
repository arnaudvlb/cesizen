import { Rapport } from "@/types/database/rapports";
import { apiFetch } from "../apiFetch";

export default async function patchRapport(
  id: string,
  reponses: string,
  commentaire: string | null,
  dateRapport: string,
  emotionGenerale: string,
): Promise<Rapport> {
  const res = await apiFetch(`/api/rapports/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      reponses,
      commentaire,
      dateRapport,
      emotionGenerale,
    }),
  });

  const data: Rapport = await res.json();

  return data;
}