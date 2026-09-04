import { useState } from "react";
import { uploadEmotionImage } from "@/services/upload/uploadEmotionImage";

export function useUploadEmotionImage(id: Number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      return await uploadEmotionImage(file, id);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading, error };
}
