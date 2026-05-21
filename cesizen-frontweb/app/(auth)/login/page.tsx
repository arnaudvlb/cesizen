"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Form from "@/components/ui/Form/Form";
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
        window.dispatchEvent(new Event("auth-change"));
        router.push("/");
      }, 1500);
    }
  };

  return (
    <>
      {(message || error) && (
        <FormMessage message={message || error || ""} error={!!error} />
      )}
      <Form
        titreForm="Connexion"
        champs={["Email", "Mot de passe"]}
        names={["email", "password"]}
        buttonText={loading ? "Connexion..." : "Se connecter"}
        placeHolders={["exemple@email.com", "••••••••"]}
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
