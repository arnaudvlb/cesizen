"use client";

import EmotionCard from "@/components/EmotionCard/EmotionCard";
import { useEmotionGenerales } from "@/hooks/useEmotionGenerales";

export default function EmotionsPage() {
  const { emotionGenerales, loading, error } = useEmotionGenerales();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Émotions</h1>
      <EmotionCard emotions={emotionGenerales} />
    </main>
  );
}