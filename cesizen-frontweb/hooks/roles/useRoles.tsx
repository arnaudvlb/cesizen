import { useEffect, useState } from "react";
import getRoles from "@/services/roles/getRoles";
import { Role } from "@/types/database/roles";

export function useRoles() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getRoles()
            .then((data) => setRoles(Array.isArray(data) ? data : []))
            .catch((err) => setError(err?.message ?? "Erreur inconnue"))
            .finally(() => setLoading(false));
    }, []);

    return { roles, loading, error };
}