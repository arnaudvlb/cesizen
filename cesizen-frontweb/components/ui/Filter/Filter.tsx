"use client";

import styles from "./Filter.module.css";
import { FilterProps } from "@/types/components/ui/FilterProps";

export default function Filter({
  value,
  onChange,
  filterBy,
  onFilterByChange,
  options,
}: FilterProps) {
  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        placeholder="Rechercher..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.filterInput}
      />

      <select
        value={filterBy}
        onChange={(e) => onFilterByChange(e.target.value)}
        className={styles.filterSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}