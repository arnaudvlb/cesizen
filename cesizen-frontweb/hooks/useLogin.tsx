import { useState } from "react";
import getLogin from "@/services/getLogin";
import { User } from "@/types/database/users";
import { Token } from "@/types/database/tokens";

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

  const loginUser = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getLogin(formData.email, formData.password);

      setData(result);

      localStorage.setItem("token", `${result.token}`);

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
