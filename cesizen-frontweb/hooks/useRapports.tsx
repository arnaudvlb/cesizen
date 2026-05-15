import { useEffect, useState } from "react";
import getRapports from "@/services/getRapports";
import { Rapport } from "@/types/database/rapports";

export function useRapports() {
    const [rapports, setRapports] = useState<Rapport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getRapports()
            .then((data) => setRapports(Array.isArray(data) ? data : []))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, []);

    return { rapports, loading, error };
}