import { useState } from "react";
import deleteEmotionService from "@/services/emotions/deleteEmotion";

export function useDeleteEmotion(id: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEmotion = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteEmotionService(id);
      return true;
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEmotion, loading, error };
}