"use client";

import { FormMessageProps } from "@/types/components/FormMessageProps";
import styles from "@/components/ui/FormMessage/FormMessage.module.css";

export default function FormMessage({ message, error }: FormMessageProps) {
  return (
    <div className={`${styles['form-message']} ${(error === true ? styles['error'] : styles['success'])}`}>
      {message}
    </div>
  );
}
