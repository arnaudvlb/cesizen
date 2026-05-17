"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm/AuthForm";
import { useLogin } from "@/hooks/auth/useLogin";
import FormMessage from "@/components/ui/FormMessage/FormMessage";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const { loginUser, loading, error } = useLogin();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    if (res) {
      setMessage("Connexion réussie !");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  return (
    <>
      {(message || error) && (
        <FormMessage message={message || error || ""} error={!!error} />
      )}
      <AuthForm
        titreForm="Connexion"
        champs={["Email", "Mot de passe"]}
        names={["email", "password"]}
        buttonText={loading ? "Connexion..." : "Se connecter"}
        placeholders={["exemple@email.com", "••••••••"]}
        onSubmit={handleSubmit}
        footerContent={
          <>
            <span>Pas encore de compte ? </span>
            <Link href="/register" className="link">
              Créer un compte
            </Link>
          </>
        }
      />
    </>
  );
}
