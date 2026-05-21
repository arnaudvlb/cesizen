import { useEffect, useState } from "react";
import getTrackers from "@/services/trackers/getTrackers";
import { Tracker } from "@/types/database/trackers";

export function useTrackers() {
    const [trackers, setTrackers] = useState<Tracker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTrackers()
            .then((data) => setTrackers(Array.isArray(data) ? data : []))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, []);

    return { trackers, loading, error };
}