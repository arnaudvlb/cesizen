import { useEffect, useState } from "react";
import getEmotionsByEmotionGenerale from "@/services/getEmotionsByEmotionGenerale";
import { Emotion } from "@/types/database/emotions";

export function useEmotionsByEmotionGenerale(emotionGeneraleId : string) {
    const [emotions, setEmotions] = useState<Emotion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getEmotionsByEmotionGenerale(emotionGeneraleId)
            .then((data) => setEmotions(Array.isArray(data) ? data : []))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, [emotionGeneraleId]);

    return { emotions, loading, error };
}