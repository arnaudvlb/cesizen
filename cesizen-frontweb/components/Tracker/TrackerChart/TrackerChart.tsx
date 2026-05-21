"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import styles from "@/components/Tracker/TrackerChart/TrackerChart.module.css";
import { TrackerChartProps } from "@/types/components/Tracker/TrackerChartProps";

export default function TrackerChart({ data }: TrackerChartProps) {
  return (
    <div className={styles.chartCard}>
      <div className={styles.header}>
        <div className={styles.title}>Répartition des émotions</div>
        <div className={styles.subtitle}>
          Analyse des rapports sur la période du tracker
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={4}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                background: "rgba(20,20,20,0.9)",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        {data.map((entry, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: entry.color }} />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
