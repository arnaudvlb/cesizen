import { Rapport } from "@/types/database/rapports";

export default async function getRapport(
  id: string
): Promise<Rapport> {
  const res = await fetch(`/api/rapport/${id}`);

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: Rapport = await res.json();

  return data;
}