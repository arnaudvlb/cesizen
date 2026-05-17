import { API_URL } from "@/expo.config";
import { Rapport } from "@/types/database/rapports";
import * as SecureStore from "expo-secure-store";

export default async function getRapport(id: string): Promise<Rapport> {
  const res = await fetch(`${API_URL}/rapports/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: Rapport = await res.json();

  return data;
}
