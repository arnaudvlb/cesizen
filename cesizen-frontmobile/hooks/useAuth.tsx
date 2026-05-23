import { authStore } from "@/store/authStore";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function useAuth() {
  const [isAuth, setIsAuth] = useState(authStore.getIsAuth());
  const [userId, setUserId] = useState<number | null>();

  const syncAuth = async () => {
    const token = await SecureStore.getItemAsync("token");
    authStore.setIsAuth(!!token);

    if (token) {
      const payload = parseJwt(token);

      setUserId(payload?.id);
    }
  };

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setIsAuth(authStore.getIsAuth());
    });

    syncAuth();

    return unsubscribe;
  }, []);

  return { isAuth, userId, syncAuth };
}
