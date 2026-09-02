import { useState } from "react";
import getRegister from "@/services/auth/getRegister";
import { User } from "@/types/database/users";

type RegisterData = {
  message: string;
  user: User;
};

type FormData = {
  email: string;
  password: string;
  nom: string;
  prenom: string;
};

export function useRegister() {
  const [data, setData] = useState<RegisterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getRegister(
        formData.email,
        formData.password,
        formData.nom,
        formData.prenom,
      );

      setData(result);

      return result;
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, registerUser };
}
