"use client";

import { useRef } from "react";
import styles from "./UploadButton.module.css";

export default function UploadButton({
  fileTypeAccepted,
  buttonText,
  onUpload,
  error,
  loading,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFile = () => {
    if (loading) return;
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await onUpload(file);
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        type="file"
        accept={fileTypeAccepted}
        className={styles.input}
        onChange={handleChange}
      />

      <button
        type="button"
        className={styles.button}
        onClick={openFile}
        disabled={loading}
      >
        {loading ? "Upload..." : buttonText}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}