"use client";

import EmotionGeneralesCard from "@/components/EmotionGeneralesCard/EmotionGeneralesCard";
import CreateButton from "@/components/ui/CreateButton/CreateButton";
import { useEmotionGenerales } from "@/hooks/emotionGenerales/useEmotionGenerales";

export default function EmotionsPage() {
  const { emotionGenerales, loading, error } = useEmotionGenerales();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Émotions</h1>
      <EmotionGeneralesCard emotions={emotionGenerales} />
      <CreateButton url="/emotion/new" />
    </main>
  );
}