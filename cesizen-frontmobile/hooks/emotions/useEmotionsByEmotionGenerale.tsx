import getEmotionsByEmotionGenerale from "@/services/emotions/getEmotionsByEmotionGenerale";
import { Emotion } from "@/types/database/emotions";
import { useEffect, useState } from "react";

export function useEmotionsByEmotionGenerale(emotionGeneraleId: string) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEmotionsByEmotionGenerale(emotionGeneraleId)
      .then((data) => setEmotions(Array.isArray(data) ? data : []))
      .catch((err) => setError(err?.message ?? "Erreur inconnue"))
      .finally(() => setLoading(false));
  }, [emotionGeneraleId]);

  return { emotions, loading, error };
}
