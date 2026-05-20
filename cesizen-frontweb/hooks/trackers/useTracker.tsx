import { useEffect, useState } from "react";
import getTracker from "@/services/trackers/getTracker";
import { Tracker } from "@/types/database/trackers";

export function useTracker(id: string) {
    const [tracker, setTracker] = useState<Tracker | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTracker(id)
            .then((data) => setTracker(data))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, [id]);

    return { tracker, loading, error };
}