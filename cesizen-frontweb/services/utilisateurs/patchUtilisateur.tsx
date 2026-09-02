import { User } from "@/types/database/users";
import { apiFetch } from "../apiFetch";

export default async function patchUtilisateur(
  id: string,
  nom: string,
  prenom: string,
  email: string | null,
  role: string | null,
  password: string | null,
): Promise<User> {
  const res = await apiFetch(`/api/utilisateurs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      nom,
      prenom,
      email,
      role,
      password,
    }),
  });

  const data: User = await res.json();

  return data;
}