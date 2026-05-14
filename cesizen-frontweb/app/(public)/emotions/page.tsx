"use client";

import EmotionGeneralesCard from "@/components/EmotionGeneralesCard/EmotionGeneralesCard";
import { useEmotionGenerales } from "@/hooks/useEmotionGenerales";

export default function EmotionsPage() {
  const { emotionGenerales, loading, error } = useEmotionGenerales();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Émotions</h1>
      <EmotionGeneralesCard emotions={emotionGenerales} />
    </main>
  );
}