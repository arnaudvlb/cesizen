import { User } from "@/types/database/users";

export default async function patchUtilisateur(
  id: string,
  nom: string,
  prenom: string,
  dateCreation: string,
  role: string,
  password: string,
): Promise<User> {
  const res = await fetch(`/api/utilisateurs/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      nom,
      prenom,
      dateCreation,
      role,
      password,
    }),
  });

  if (!res.ok) {
    if (res.status === 400) {
      throw new Error("Données invalides.");
    } else if (res.status === 403) {
      throw new Error("Accès non autorisé.");
    } else if (res.status === 404) {
      throw new Error("Ressource introuvable.");
    } else {
      throw new Error(`Erreur API: ${res.status}`);
    }
  }

  const data: User = await res.json();

  return data;
}