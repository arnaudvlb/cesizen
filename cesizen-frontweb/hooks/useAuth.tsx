import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);

  const syncAuth = () => {
    setIsAuth(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    syncAuth();

    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  return { isAuth };
}