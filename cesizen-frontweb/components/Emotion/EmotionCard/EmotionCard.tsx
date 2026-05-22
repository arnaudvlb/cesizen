"use client";

import styles from "@/components/Emotion/EmotionCard/EmotionCard.module.css";
import EditButton from "@/components/ui/EditButton/EditButton";
import { useAuth } from "@/hooks/useAuth";
import { EmotionCardProps } from "@/types/components/Emotion/EmotionCardProps";

export default function EmotionCard({ emotions }: EmotionCardProps) {
  const { isAdmin } = useAuth();
  return (
    <section className={styles.emotionRelated}>
      <h2>Émotions associées</h2>

      <div className={styles.emotionCards}>
        {emotions.map((emotion) => (
          <article key={emotion.id} className={styles.emotionCard}>
            <h3>{emotion.libelle}</h3>
            <p>{emotion.description}</p>
            {isAdmin && (
              <div className={styles.emotionActions}>
                <EditButton url={`/emotion/edit/${emotion.id}`} />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
