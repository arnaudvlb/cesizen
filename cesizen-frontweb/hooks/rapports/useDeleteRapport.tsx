import { useState } from "react";
import deleteRapportService from "@/services/rapports/deleteRapport";

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
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRapport, loading, error };
}