"use client";

import { TextAreaProps } from "@/types/components/ui/TextAreaProps";
import styles from "@/components/ui/TextArea/TextArea.module.css";

export default function CommentaireField({
  value,
  onChange,
  placeHolder,
}: TextAreaProps) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeHolder}
    />
  );
}