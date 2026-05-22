import { useEffect, useState } from "react";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const syncAuth = () => {
    const token = localStorage.getItem("token");

    setIsAuth(!!token);

    if (token) {
      const payload = parseJwt(token);

      setIsAdmin(payload.roles.includes("ROLE_ADMIN"));
    } else {
      setIsAdmin(false);
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
  };
}
