import { useEffect, useState } from "react";
import getEmotionGenerale from "@/services/getEmotionGenerale";
import { EmotionGenerale } from "@/types/database/emotionGenerales";

export function useEmotionGenerale(id: string) {
    const [emotionGenerale, setEmotionGenerale] = useState<EmotionGenerale | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getEmotionGenerale(id)
            .then((data) => setEmotionGenerale(data))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, [id]);

    return { emotionGenerale, loading, error };
}