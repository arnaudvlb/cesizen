import { useAuth } from "@/hooks/useAuth";
import getLogin from "@/services/auth/getLogin";
import { Token } from "@/types/database/tokens";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

type LoginData = {
  token: Token;
};

type FormData = {
  email: string;
  password: string;
};

export function useLogin() {
  const [data, setData] = useState<LoginData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { syncAuth } = useAuth();

  const loginUser = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getLogin(formData.email, formData.password);

      setData(result);

      await SecureStore.setItemAsync("token", String(result.token));
      await syncAuth();

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
