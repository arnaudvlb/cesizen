import { RapportsCardProps } from "@/types/components/RapportsCardProps";
import styles from "@/components/RapportsCard/RapportCard.module.css";

export default function RapportCard({ rapports }: RapportsCardProps) {
  return (
    <div className={styles.rapportsGrid}>
      {rapports.map((rapport) => (
        <article key={rapport.id} className={styles.rapportCard}>
          <img
            src={`http://localhost:8000${rapport.emotionGenerale.imageUrl}`}
            alt={rapport.emotionGenerale.libelle}
          />

          <div className={styles.rapportContent}>
            <h3>{rapport.emotionGenerale.libelle}</h3>
            <p className={styles.rapportDate}>
              {new Date(rapport.dateRapport).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
