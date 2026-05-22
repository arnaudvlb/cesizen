import { useState } from "react";
import createEmotionGeneraleService from "@/services/emotionGenerales/createEmotionGenerale";
import { EmotionGenerale } from "@/types/database/emotionGenerales";

type FormData = {
  libelle: string;
  description: string;
  couleur: string;
};

export function useCreateEmotionGenerale() {
  const [data, setData] = useState<EmotionGenerale | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEmotionGenerale = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createEmotionGeneraleService(
        formData.libelle,
        formData.description,
        formData.couleur,
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

  return { data, loading, error, createEmotionGenerale };
}