import { useState } from "react";
import patchEmotionService from "@/services/emotions/patchEmotion";
import { Emotion } from "@/types/database/emotions";

type FormData = {
  libelle: string;
  description: string;
  emotionGenerale: string;
};

export function usePatchEmotion(id: string) {
  const [data, setData] = useState<Emotion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchEmotion = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await patchEmotionService(
        id,
        formData.libelle,
        formData.description,
        formData.emotionGenerale,
      );

      setData(result);

      return result;
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, patchEmotion };
}
