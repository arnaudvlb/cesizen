"use client";

import { EmotionGeneralesCardProps } from "@/types/components/EmotionGeneralesCardProps";
import styles from "@/components/EmotionGeneralesCard/EmotionGeneralesCard.module.css";
import Link from "next/link";

export default function EmotionGeneralesCard({ emotions }: EmotionGeneralesCardProps) {
  return (
    <div className={styles.emotionGrid}>
      {emotions.map((emotion) => (
        <Link key={emotion.id} href={`/emotion/${emotion.id}`} className={styles.emotionCard}>
          <img
            src={`/emotions/${emotion.id}.png`}
            alt={emotion.libelle}
            onError={(e) => {
              e.currentTarget.src = "/emotions/0.png";
            }}
          />
          <span>{emotion.libelle}</span>
        </Link>
      ))}
    </div>
  );
}
