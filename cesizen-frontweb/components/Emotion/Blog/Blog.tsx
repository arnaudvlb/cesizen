
import { BlogProps } from "@/types/components/Emotion/BlogProps";
import styles from "@/components/Emotion/Blog/Blog.module.css";


export default function Blog({ emotionGenerale }: BlogProps) {
  return (
          <section className={styles.generalEmotion}>
        <img
          src={`http://localhost:8000/${emotionGenerale.imageUrl}`}
          alt={emotionGenerale.libelle}
          className={styles.generalEmotionImage}
        />

        <div className={styles.generalEmotionContent}>
          <span className={styles.emotionBadge} style={{color: emotionGenerale.couleur , background:emotionGenerale.couleur + "33"}}>Émotion générale</span>

          <h1>{emotionGenerale.libelle}</h1>

          <p>{emotionGenerale.description}</p>
        </div>
      </section>
  );
}
