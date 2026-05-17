import { API_URL } from "@/expo.config";
import { User } from "@/types/database/users";

type RegisterData = {
  message: string;
  user: User;
};

export default async function getRegister(
  email: string,
  password: string,
  nom: string,
  prenom: string,
): Promise<RegisterData> {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      nom,
      prenom,
    }),
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: RegisterData = await res.json();

  return data;
}
