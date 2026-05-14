import { useEffect, useState } from "react";
import getEmotions from "@/services/getEmotions";
import { Emotion } from "@/types/database/emotions";

export function useEmotions(emotionGeneraleId : string) {
    const [emotions, setEmotions] = useState<Emotion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getEmotions(emotionGeneraleId)
            .then((data) => setEmotions(Array.isArray(data) ? data : []))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, [emotionGeneraleId]);

    return { emotions, loading, error };
}