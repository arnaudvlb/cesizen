import { useEffect, useState } from "react";
import { apiFetch } from "@/services/apiFetch";

interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  roles: string[];
}

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const syncAuth = async () => {
    try {
      const response = await apiFetch("/api/me");

      if (!response.ok) {
        setIsAuth(false);
        setIsAdmin(false);
        setUserId(null);
        return;
      }

      const user: User = await response.json();

      setIsAuth(true);
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
      setUserId(user.id);
    } catch {
      setIsAuth(false);
      setIsAdmin(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    syncAuth();

    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  return {
    isAuth,
    isAdmin,
    userId,
  };
}