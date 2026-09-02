import { useState } from "react";
import patchEmotionGeneraleService from "@/services/emotionGenerales/patchEmotionGenerale";
import { EmotionGenerale } from "@/types/database/emotionGenerales";

type FormData = {
  libelle: string;
  description: string;
  couleur: string;
};

export function usePatchEmotionGenerale(id: string) {
  const [data, setData] = useState<EmotionGenerale | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchEmotionGenerale = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await patchEmotionGeneraleService(
        id,
        formData.libelle,
        formData.description,
        formData.couleur,
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

  return { data, loading, error, patchEmotionGenerale };
}
