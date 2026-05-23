import { useEffect, useState } from "react";
import getUtilisateurs from "@/services/utilisateurs/getUtilisateurs";
import { User } from "@/types/database/users";

export function useUtilisateurs() {
    const [utilisateurs, setUtilisateurs] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getUtilisateurs()
            .then((data) => setUtilisateurs(Array.isArray(data) ? data : []))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, []);

    return { utilisateurs, loading, error };
}