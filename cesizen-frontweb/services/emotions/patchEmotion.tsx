import { Emotion } from "@/types/database/emotions";
import { apiFetch } from "../apiFetch";

export default async function patchEmotion(
  id: string,
  libelle: string,
  description: string,
  emotionGenerale: string,
): Promise<Emotion> {
  const res = await apiFetch(`/api/emotions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      libelle,
      description,
      emotionGenerale,
    }),
  });

  const data: Emotion = await res.json();

  return data;
}
