import { EmotionsSelectProps } from "@/types/components/EmotionsSelectProps";
import styles from "@/components/EmotionsSelect/EmotionsSelect.module.css";

export default function EmotionsSelect({
  question,
  value,
  emotions,
  onChange,
}: EmotionsSelectProps) {
  return (
    <div className={styles.container}>
      <p className={styles.question}>
        {question}
      </p>

      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="">
          Choisir
        </option>

        {emotions.map((emotion) => (
          <option
            key={emotion.id}
            value={emotion.id}
          >
            {emotion.libelle}
          </option>
        ))}
      </select>
    </div>
  );
}