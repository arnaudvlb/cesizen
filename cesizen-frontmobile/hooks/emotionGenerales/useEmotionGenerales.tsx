import getEmotionGenerales from "@/services/emotionGenerales/getEmotionGenerales";
import { EmotionGenerale } from "@/types/database/emotionGenerales";
import { useEffect, useState } from "react";

export function useEmotionGenerales() {
  const [emotionGenerales, setEmotionGenerales] = useState<EmotionGenerale[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEmotionGenerales()
      .then((data) => setEmotionGenerales(Array.isArray(data) ? data : []))
      .catch((err) => setError(err?.message ?? "Erreur inconnue"))
      .finally(() => setLoading(false));
  }, []);

  return { emotionGenerales, loading, error };
}
