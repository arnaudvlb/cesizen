import { API_URL } from "@/expo.config";
import { User } from "@/types/database/users";
import * as SecureStore from "expo-secure-store";

export default async function getUtilisateur(id: string): Promise<User> {
  const res = await fetch(`${API_URL}/utilisateurs/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: User = await res.json();

  return data;
}
