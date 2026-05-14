import { EmotionCardProps } from "@/types/components/EmotionCardProps";
import styles from "@/components/EmotionCard/EmotionCard.module.css";

export default function EmotionCard({ emotions }: EmotionCardProps) {
  return (
    <div className={styles.emotionGrid}>
      {emotions.map((emotion) => (
        <div key={emotion.id} className={styles.emotionCard}>
          <img
            src={`/emotions/${emotion.id}.png`}
            alt={emotion.libelle}
            onError={(e) => {
              e.currentTarget.src = "/emotions/0.png";
            }}
          />
          <span>{emotion.libelle}</span>
        </div>
      ))}
    </div>
  );
}
