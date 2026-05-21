import { TrackerRecapProps } from "@/types/components/Tracker/TrackerRecapProps";
import styles from "./TrackerRecap.module.css";

export default function TrackerRecap({ recap }: TrackerRecapProps) {
  return (
    <div className={styles.wrapper}>
      {recap.map((e) => (
        <div key={e.libelle} className={styles.item}>
          <div className={styles.left}>
            <div
              className={styles.dot}
              style={{ background: e.couleur }}
            />
            <span className={styles.label}>{e.libelle}</span>
          </div>

          <span className={styles.right}>
            {e.count} ({e.percentage}%)
          </span>
        </div>
      ))}
    </div>
  );
}