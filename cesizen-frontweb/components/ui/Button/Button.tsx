"use client";

import { ButtonProps } from "@/types/components/ui/ButtonProps";
import styles from "@/components/ui/Button/Button.module.css";

export default function Button({ text }: ButtonProps) {
    return (
        <button className={styles.btnPrimary} type="submit">{text}</button>
    );
} 