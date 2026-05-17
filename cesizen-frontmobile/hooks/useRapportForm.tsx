import { useParseReponsesRapport } from "@/hooks/useParseReponseRapport";
import { Emotion } from "@/types/database/emotions";
import { useEffect, useMemo, useState } from "react";

type ReponseMap = Record<number, number>;

export function useRapportForm(
  emotions: Emotion[],
  questionsCount: number,
  reponsesStockees?: string,
  commentaireStocke?: string,
) {
  const [reponses, setReponses] = useState<ReponseMap>({});
  const [commentaire, setCommentaire] = useState("");

  useEffect(() => {
    if (reponsesStockees) {
      setReponses(useParseReponsesRapport(reponsesStockees));
    }
    if (commentaireStocke) {
      setCommentaire(commentaireStocke);
    }
  }, [reponsesStockees, commentaireStocke]);

  const setReponse = (questionIndex: number, emotionId: number) => {
    setReponses((prev) => ({
      ...prev,
      [questionIndex]: emotionId,
    }));
  };

  const fullForm = useMemo(() => {
    return Array.from({ length: questionsCount }).every(
      (_, index) => reponses[index] !== undefined && reponses[index] !== null,
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
      const numericId = Number(emotionId);

      const emotion = emotions.find((e) => e.id === numericId);

      if (!emotion) return;

      const iri = emotion.emotionGenerale as unknown as string;

      const id = Number(iri.split("/").pop());

      if (Number.isNaN(id)) return;

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
