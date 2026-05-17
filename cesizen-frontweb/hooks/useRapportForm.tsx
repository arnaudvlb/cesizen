import { useMemo, useState } from "react";
import { Emotion } from "@/types/database/emotions";

type ReponseMap = Record<number, number>;

export function useRapportForm(
  emotions: Emotion[],
  questionsCount: number,
) {
  const [reponses, setReponses] = useState<ReponseMap>({});
  const [commentaire, setCommentaire] = useState("");

  const setReponse = (questionIndex: number, emotionId: number) => {
    setReponses((prev) => ({
      ...prev,
      [questionIndex]: emotionId,
    }));
  };

  const fullForm = useMemo(() => {
    return Array.from({ length: questionsCount }).every(
      (_, index) =>
        reponses[index] !== undefined &&
        reponses[index] !== null,
    );
  }, [reponses, questionsCount]);

  const serializedReponses = useMemo(() => {
    return Object.keys(reponses)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => reponses[Number(key)])
      .join(",");
  }, [reponses]);

  const emotionGeneraleId = useMemo(() => {
    const counts: Record<number, number> = {};

    Object.values(reponses).forEach((emotionId) => {
      const emotion = emotions.find((e) => e.id === emotionId);

      if (!emotion) return;

      const id = emotion.emotionGenerale.id;

      counts[id] = (counts[id] || 0) + 1;
    });

    let bestId: number | undefined;
    let max = 0;

    for (const [id, value] of Object.entries(counts)) {
      const numericId = Number(id);

      if (value > max) {
        max = value;
        bestId = numericId;
      }
    }

    return bestId;
  }, [reponses, emotions]);

  return {
    reponses,
    commentaire,
    setCommentaire,
    setReponse,
    fullForm,
    serializedReponses,
    emotionGeneraleId,
  };
}