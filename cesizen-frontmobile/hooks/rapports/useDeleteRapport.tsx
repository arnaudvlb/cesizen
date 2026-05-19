import deleteRapportService from "@/services/rapports/deleteRapport";
import { useState } from "react";

export function useDeleteRapport(id: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRapport = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteRapportService(id);
      return true;
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRapport, loading, error };
}
