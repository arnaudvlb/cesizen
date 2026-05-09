"use client";

import { useState } from "react";
import { AuthFormProps } from "@/types/components/AuthFormProps";
import styles from "@/components/AuthForm/AuthForm.module.css";
import Button from "@/components/ui/Button/Button";

export default function AuthForm({
  titreForm,
  champs,
  names,
  buttonText,
  placeholders,
  onSubmit,
  footerContent,
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="pageCenter">
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>{titreForm}</h1>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          {champs.map((champ, index) => {
            const key = names[index];

            return (
              <div key={index} className={styles.formGroup}>
                <label htmlFor={key}>{champ}</label>
                <input
                  type={key === "password" ? "password" : "text"}
                  id={key}
                  placeholder={placeholders?.[index] || ""}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          })}

          <Button text={buttonText} />

          {footerContent && (
            <div className={styles.authFooter}>{footerContent}</div>
          )}
        </form>
      </div>
    </div>
  );
}
