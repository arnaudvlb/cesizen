import { authStore } from "@/store/authStore";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(authStore.getIsAuth());

  const syncAuth = async () => {
    const token = await SecureStore.getItemAsync("token");

    authStore.setIsAuth(!!token);
  };

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setIsAuth(authStore.getIsAuth());
    });

    syncAuth();

    return unsubscribe;
  }, []);

  return { isAuth, syncAuth };
}
