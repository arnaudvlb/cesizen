import { useState } from "react";
import patchRapportService from "@/services/rapports/patchRapport";
import { Rapport } from "@/types/database/rapports";

type FormData = {
  reponses: string;
  commentaire: string | null;
  dateRapport: string;
  emotionGenerale: string;
};

export function usePatchRapport(id: string) {
  const [data, setData] = useState<Rapport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchRapport = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await patchRapportService(
        id,
        formData.reponses,
        formData.commentaire,
        formData.dateRapport,
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

  return { data, loading, error, patchRapport };
}