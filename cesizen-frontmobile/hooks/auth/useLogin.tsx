import * as SecureStore from "expo-secure-store";
import { useState } from "react";

import getLogin from "@/services/auth/getLogin";
import { Token } from "@/types/database/tokens";
import { User } from "@/types/database/users";

type LoginData = {
  token: Token;
  user: User;
};

type FormData = {
  email: string;
  password: string;
};

export function useLogin() {
  const [data, setData] = useState<LoginData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getLogin(formData.email, formData.password);

      setData(result);

      await SecureStore.setItemAsync("token", String(result.token));
      await SecureStore.setItemAsync("user", JSON.stringify(result.user));

      return result;
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, loginUser };
}
