"use client";

import EmotionCard from "@/components/EmotionCard/EmotionCard";
import { useEmotions } from "@/hooks/useEmotions";

export default function EmotionsPage() {
  const { emotions, loading, error } = useEmotions();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Émotions</h1>
      <EmotionCard emotions={emotions} />
    </main>
  );
}