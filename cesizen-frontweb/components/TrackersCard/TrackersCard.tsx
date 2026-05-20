import { TrackersCardProps } from "@/types/components/TrackersCardProps";
import styles from "@/components/TrackersCard/TrackersCard.module.css";

function truncate(text: string, max: number) {
  return text?.length > max ? text.slice(0, max) + "..." : text;
}

export function TrackersCard({ trackers }: TrackersCardProps) {
  return (
    <div className={styles.grid}>
      {trackers.map((tracker) => (
        <div key={tracker.id} className={styles.card}>
          <div className={styles.accent} />

          <div className={styles.cardHeader}>
            <h2>{tracker.libelle}</h2>
          </div>

          <div className={styles.meta}>
            <span>
              {new Date(tracker.dateDebut).toLocaleDateString("fr-FR")}
            </span>
            <span className={styles.dot} />
            <span>{new Date(tracker.dateFin).toLocaleDateString("fr-FR")}</span>
          </div>

          <p className={styles.desc}>{truncate(tracker.description, 50)}</p>
        </div>
      ))}
    </div>
  );
}
