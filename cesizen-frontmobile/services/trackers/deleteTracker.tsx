import { API_URL } from "@/expo.config";
import * as SecureStore from "expo-secure-store";

export default async function deleteTracker(id: number | null): Promise<void> {
  const res = await fetch(`${API_URL}/trackers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
}
