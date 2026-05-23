import { User } from "@/types/database/users";

export default async function getUtilisateur(
  id: string
): Promise<User> {
  const res = await fetch(`/api/utilisateurs/${id}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: User = await res.json();

  return data;
}