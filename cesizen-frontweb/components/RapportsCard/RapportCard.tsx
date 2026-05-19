import { RapportsCardProps } from "@/types/components/RapportsCardProps";
import styles from "@/components/RapportsCard/RapportCard.module.css";
import Link from "next/link";
import EditButton from "../ui/EditButton/EditButton";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import { useDeleteRapport } from "@/hooks/rapports/useDeleteRapport";

export default function RapportCard({ rapports }: RapportsCardProps) {
  const { deleteRapport } = useDeleteRapport(0);
  return (
    <div className={styles.rapportsGrid}>
      {rapports.map((rapport) => (
        <article key={rapport.id} className={styles.rapportCard}>
          <Link
            href={`/emotion/${rapport.emotionGenerale.id}`}
            className={styles.cardLink}
          >
            <img
              className={styles.rapportImage}
              src={`http://localhost:8000${rapport.emotionGenerale.imageUrl}`}
              alt={rapport.emotionGenerale.libelle}
            />

            <div className={styles.rapportContent}>
              <h3 className={styles.rapportTitle}>
                {rapport.emotionGenerale.libelle}
              </h3>

              <p className={styles.rapportDate}>
                {new Date(rapport.dateRapport).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </Link>

          <div className={styles.rapportActions}>
            <EditButton url={`/rapport/${rapport.id}`} />
            <DeleteButton
              onConfirm={async () => {
                await deleteRapport(rapport.id);
              }}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
