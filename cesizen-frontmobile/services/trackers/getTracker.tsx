import { API_URL } from "@/expo.config";
import { Tracker } from "@/types/database/trackers";
import * as SecureStore from "expo-secure-store";

export default async function getRapport(id: string): Promise<Tracker> {
  const res = await fetch(`${API_URL}/trackers/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: Tracker = await res.json();

  return data;
}
