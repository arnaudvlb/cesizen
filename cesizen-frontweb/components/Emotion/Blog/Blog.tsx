import { BlogProps } from "@/types/components/Emotion/BlogProps";
import styles from "@/components/Emotion/Blog/Blog.module.css";
import UploadButton from "@/components/ui/UploadButton/UploadButton";
import { useUploadEmotionImage } from "@/hooks/upload/useUploadEmotionImage";
import { useAuth } from "@/hooks/useAuth";

export default function Blog({ emotionGenerale }: BlogProps) {
  const { upload, loading, error } = useUploadEmotionImage(emotionGenerale.id);
  const { isAdmin } = useAuth();
  return (
    <section className={styles.generalEmotion}>
      <div>
        <img
          src={`${emotionGenerale.imageUrl}`}
          alt={emotionGenerale.libelle}
          className={styles.generalEmotionImage}
        />
        {isAdmin && (
        <UploadButton
          fileTypeAccepted="image/png"
          buttonText="Uploadez une nouvelle image"
          onUpload={upload}
          error={error}
          loading={loading}
        />
        )}
      </div>
      <div className={styles.generalEmotionContent}>
        <span
          className={styles.emotionBadge}
          style={{
            color: emotionGenerale.couleur,
            background: emotionGenerale.couleur + "33",
          }}
        >
          Émotion générale
        </span>

        <h1>{emotionGenerale.libelle}</h1>

        <p>{emotionGenerale.description}</p>
      </div>
    </section>
  );
}
