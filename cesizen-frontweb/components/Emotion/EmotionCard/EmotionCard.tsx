"use client";

import styles from "@/components/Emotion/EmotionCard/EmotionCard.module.css";
import { EmotionCardProps } from "@/types/components/Emotion/EmotionCardProps";

export default function EmotionCard({ emotions }: EmotionCardProps) {
    return (
        
      <section className={styles.emotionRelated}>
        <h2>Émotions associées</h2>

        <div className={styles.emotionCards}>
          {emotions.map((emotion) => (
            <article key={emotion.id} className={styles.emotionCard}>
              <h3>{emotion.libelle}</h3>
              <p>{emotion.description}</p>
            </article>
          ))}
        </div>
      </section>
    );
}