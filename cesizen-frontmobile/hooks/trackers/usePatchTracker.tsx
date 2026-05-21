import { useState } from "react";
import patchTrackerService from "@/services/trackers/patchTracker";
import { Tracker } from "@/types/database/trackers";

type FormData = {
  dateDebut: string;
  dateFin: string;
  libelle: string;
  description: string | null;
};

export function usePatchTracker(id: string) {
  const [data, setData] = useState<Tracker | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchTracker = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await patchTrackerService(
        id,
        formData.dateDebut,
        formData.dateFin,
        formData.libelle,
        formData.description,
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

  return { data, loading, error, patchTracker };
}