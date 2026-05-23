import { useEffect, useState } from "react";
import getUtilisateur from "@/services/utilisateurs/getUtilisateur";
import { User } from "@/types/database/users";

export function useUtilisateur(id: string) {
    const [utilisateur, setUtilisateur] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getUtilisateur(id)
            .then((data) => setUtilisateur(data))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, [id]);

    return { utilisateur, loading, error };
}