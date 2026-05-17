"use client";

import { useParams } from "next/navigation";
import { useEmotionGenerale } from "@/hooks/emotionGenerales/useEmotionGenerale";
import { useEmotionsByEmotionGenerale } from "@/hooks/emotions/useEmotionsByEmotionGenerale";
import Blog from "@/components/Emotion/Blog/Blog";
import EmotionCard from "@/components/Emotion/EmotionCard/EmotionCard";

export default function Emotion() {
  const params = useParams();
  const id = params.id as string;

  const {
    emotionGenerale,
    loading: loadingEmotionGenerale,
    error: errorEmotionGenerale,
  } = useEmotionGenerale(id);

  const {
    emotions,
    loading: loadingEmotions,
    error: errorEmotions,
  } = useEmotionsByEmotionGenerale(id);

  if (loadingEmotionGenerale || loadingEmotions) {
    return <p>Chargement...</p>;
  }

  if (errorEmotionGenerale || errorEmotions || !emotionGenerale || !emotions) {
    return <p>Erreur : {errorEmotionGenerale || errorEmotions}</p>;
  }

  return (
    <main className="page">
      <Blog emotionGenerale={emotionGenerale} />
      <EmotionCard emotions={emotions} />
    </main>
  );
}
