import { TrackersCardProps } from "@/types/components/TrackersCardProps";
import styles from "@/components/TrackersCard/TrackersCard.module.css";
import EditButton from "../ui/EditButton/EditButton";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import { useDeleteTracker } from "@/hooks/trackers/useDeleteRapport";
import Link from "next/link";

function truncate(text: string, max: number) {
  return text?.length > max ? text.slice(0, max) + "..." : text;
}

export function TrackersCard({ trackers }: TrackersCardProps) {
  const { deleteTracker } = useDeleteTracker(0);
  return (
    <div className={styles.grid}>
      {trackers.map((tracker) => (
        <div key={tracker.id} className={styles.card}>
          <Link href={`/tracker/${tracker.id}`} className={styles.link}>
            <div className={styles.accent} />

            <div className={styles.cardHeader}>
              <h2>{tracker.libelle}</h2>
            </div>

            <div className={styles.meta}>
              <span>
                {new Date(tracker.dateDebut).toLocaleDateString("fr-FR")}
              </span>
              <span className={styles.dot} />
              <span>
                {new Date(tracker.dateFin).toLocaleDateString("fr-FR")}
              </span>
            </div>

            <p className={styles.desc}>{truncate(tracker.description, 50)}</p>
          </Link>
          <div className={styles.trackerActions}>
            <EditButton url={`/tracker/edit/${tracker.id}`} />
            <DeleteButton
              onConfirm={async () => {
                await deleteTracker(tracker.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
