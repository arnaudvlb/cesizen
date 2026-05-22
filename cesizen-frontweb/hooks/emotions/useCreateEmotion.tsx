import { useState } from "react";
import createEmotionService from "@/services/emotions/createEmotion";
import { Emotion } from "@/types/database/emotions";

type FormData = {
  libelle: string;
  description: string;
  emotionGenerale: string;
};

export function useCreateEmotion() {
  const [data, setData] = useState<Emotion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEmotion = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createEmotionService(
        formData.libelle,
        formData.description,
        formData.emotionGenerale,
      );

      setData(result);

      return result;
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createEmotion };
}