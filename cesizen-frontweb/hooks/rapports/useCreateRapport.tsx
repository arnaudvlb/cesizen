import { useState } from "react";
import createRapportService from "@/services/rapports/createRapport";
import { Rapport } from "@/types/database/rapports";

type FormData = {
  reponses: string;
  commentaire: string | null;
  dateRapport: string;
  emotionGenerale: string;
};

export function useCreateRapport() {
  const [data, setData] = useState<Rapport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRapport = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createRapportService(
        formData.reponses,
        formData.commentaire,
        formData.dateRapport,
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

  return { data, loading, error, createRapport };
}