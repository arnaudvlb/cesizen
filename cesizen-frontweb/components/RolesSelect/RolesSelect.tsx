"use client";

import styles from "@/components/RolesSelect/RolesSelect.module.css";
import { RolesSelectProps } from "@/types/components/RolesSelectProps";

export default function RolesSelect({
  roles,
  value,
  onChange,
}: RolesSelectProps) {
    console.log(roles);
  return (
    <div className={styles.container}>
      <select 
        className={styles.select}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {roles.map((role) => (
          <option key={role.id_role} value={role.id_role}>
            {role.libelle}
          </option>
        ))}
      </select>
    </div>
  );
}
