"use client";

import EmotionGeneralesCard from "@/components/EmotionGeneralesCard/EmotionGeneralesCard";
import CreateButton from "@/components/ui/CreateButton/CreateButton";
import { useEmotionGenerales } from "@/hooks/emotionGenerales/useEmotionGenerales";
import { useAuth } from "@/hooks/useAuth";

export default function EmotionsPage() {
  const { emotionGenerales, loading, error } = useEmotionGenerales();
  const { isAdmin } = useAuth();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Émotions</h1>
      <EmotionGeneralesCard emotions={emotionGenerales} />
      {isAdmin && <CreateButton url="/emotiongenerale/new" />}
    </main>
  );
}
