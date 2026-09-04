import { Rapport } from "@/types/database/rapports";
import { apiFetch } from "../apiFetch";

export default async function createRapport(
  reponses: string,
  commentaire: string | null,
  dateRapport: string,
  emotionGenerale: string,
): Promise<Rapport> {
  const res = await apiFetch("/api/rapports", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
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
