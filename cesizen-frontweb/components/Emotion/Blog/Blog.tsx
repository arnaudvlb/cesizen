
import { BlogProps } from "@/types/components/Emotion/BlogProps";
import styles from "@/components/Emotion/Blog/Blog.module.css";


export default function Blog({ emotionGenerale }: BlogProps) {
  return (
          <section className={styles.generalEmotion}>
        <img
          src={`/emotions/${emotionGenerale.id}.png`}
          alt={emotionGenerale.libelle}
          className={styles.generalEmotionImage}
          onError={(e) => {
            e.currentTarget.src = "/emotions/0.png";
          }}
        />

        <div className={styles.generalEmotionContent}>
          <span className={styles.emotionBadge}>Émotion générale</span>

          <h1>{emotionGenerale.libelle}</h1>

          <p>{emotionGenerale.description}</p>
        </div>
      </section>
  );
}
