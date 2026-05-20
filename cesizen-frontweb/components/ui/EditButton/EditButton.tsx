"use client";

import { EditButtonProps } from "@/types/components/ui/EditButtonProps";
import styles from "@/components/ui/EditButton/EditButton.module.css";
import Link from "next/link";

export default function EditButton({ url }: EditButtonProps) {
  return (
    <Link href={url} className={styles.editButton}>
      Modifier
    </Link>
  );
}