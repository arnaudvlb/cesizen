"use client";

import { EmotionGeneralesCardProps } from "@/types/components/EmotionGeneralesCardProps";
import styles from "@/components/EmotionGeneralesCard/EmotionGeneralesCard.module.css";
import Link from "next/link";
import EditButton from "../ui/EditButton/EditButton";
import { useAuth } from "@/hooks/useAuth";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import { useDeleteEmotionGenerale } from "@/hooks/emotionGenerales/useDeleteEmotionGenerale";

export default function EmotionGeneralesCard({
  emotions,
}: EmotionGeneralesCardProps) {
  const { deleteEmotionGenerale } = useDeleteEmotionGenerale(0);
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
              <EditButton url={`/emotiongenerale/edit/${emotion.id}`} />
              <DeleteButton
                onConfirm={async () => {
                  await deleteEmotionGenerale(emotion.id);
                }}
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
