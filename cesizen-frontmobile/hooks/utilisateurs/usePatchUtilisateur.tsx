import patchUtilisateurService from "@/services/utilisateurs/patchUtilisateur";
import { User } from "@/types/database/users";
import { useState } from "react";

type FormData = {
  nom: string;
  prenom: string;
  email: string | null;
  password: string | null;
};

export function usePatchUtilisateur(id: string) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchUtilisateur = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await patchUtilisateurService(
        id,
        formData.nom,
        formData.prenom,
        formData.email,
        formData.password,
      );

      setData(result);

      return result;
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, patchUtilisateur };
}
