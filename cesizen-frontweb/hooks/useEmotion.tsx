import { useEffect, useState } from "react";
import getEmotion from "@/services/getEmotion";
import { Emotion } from "@/types/database/emotions";

export function useEmotion(id: string) {
    const [emotion, setEmotion] = useState<Emotion | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getEmotion(id)
            .then((data) => setEmotion(data))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, [id]);

    return { emotion, loading, error };
}