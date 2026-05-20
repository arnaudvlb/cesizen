import { useState } from "react";
import deleteTrackerService from "@/services/trackers/deleteTracker";

export function useDeleteTracker(id: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTracker = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteTrackerService(id);
      return true;
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTracker, loading, error };
}