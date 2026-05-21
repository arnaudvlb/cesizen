"use client";

import { useTrackerChart } from "@/hooks/useTrackerChart";
import TrackerRecap from "../TrackerRecap/TrackerRecap";
import TrackerChart from "../TrackerChart/TrackerChart";
import { TrackerDetailsProps } from "@/types/components/Tracker/TrackerDetailsProps";
import styles from "./TrackerDetails.module.css";

export default function TrackerDetails({
  tracker,
  rapports,
}: TrackerDetailsProps) {
  const chart = useTrackerChart(tracker, rapports);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{tracker.libelle}</h1>

        <div className={styles.dates}>
          {new Date(tracker.dateDebut).toLocaleDateString("fr-FR")} →{" "}
          {new Date(tracker.dateFin).toLocaleDateString("fr-FR")}
        </div>

        {tracker.description && (
          <p className={styles.description}>{tracker.description}</p>
        )}
      </header>

      <section className={styles.chartSection}>
        <TrackerChart data={chart.chartData} />
      </section>

      <section className={styles.recapSection}>
        <TrackerRecap recap={chart.recap} />
      </section>

      <footer className={styles.summary}>{chart.summary}</footer>
    </div>
  );
}
