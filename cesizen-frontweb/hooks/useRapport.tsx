import { useEffect, useState } from "react";
import getRapport from "@/services/getRapport";
import { Rapport } from "@/types/database/rapports";

export function useRapport(id: string) {
    const [rapport, setRapport] = useState<Rapport | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getRapport(id)
            .then((data) => setRapport(data))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, [id]);

    return { rapport, loading, error };
}