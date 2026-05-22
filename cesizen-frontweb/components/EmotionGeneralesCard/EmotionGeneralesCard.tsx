"use client";

import { EmotionGeneralesCardProps } from "@/types/components/EmotionGeneralesCardProps";
import styles from "@/components/EmotionGeneralesCard/EmotionGeneralesCard.module.css";
import Link from "next/link";
import EditButton from "../ui/EditButton/EditButton";
import { useAuth } from "@/hooks/useAuth";

export default function EmotionGeneralesCard({
  emotions,
}: EmotionGeneralesCardProps) {
  const { isAdmin } = useAuth();
  return (
    <div className={styles.emotionGrid}>
      {emotions.map((emotion) => (
        <article key={emotion.id} className={styles.emotionCard}>
          <Link href={`/emotion/${emotion.id}`} className={styles.emotionLink}>
            <img
              src={`http://localhost:8000${emotion.imageUrl}`}
              alt={emotion.libelle}
            />
            <span>{emotion.libelle}</span>
          </Link>
          {isAdmin && (
            <div className={styles.emotionActions}>
              <EditButton url={`/emotion/edit/${emotion.id}`}/>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
