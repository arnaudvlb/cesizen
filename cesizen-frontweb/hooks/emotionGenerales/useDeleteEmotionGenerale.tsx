import { useState } from "react";
import deleteEmotionGeneraleService from "@/services/emotionGenerales/deleteEmotionGenerale";

export function useDeleteEmotionGenerale(id: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEmotionGenerale = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteEmotionGeneraleService(id);
      return true;
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEmotionGenerale, loading, error };
}