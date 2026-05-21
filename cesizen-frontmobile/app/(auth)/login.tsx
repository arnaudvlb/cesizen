import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useLogin } from "@/hooks/auth/useLogin";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  const { loginUser, loading, error } = useLogin();
  const colors = useThemeColors();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    if (res) {
      setMessage("Connexion réussie !");

      setTimeout(() => {
        router.replace("/");
      }, 1000);
    }
  };

  return (
    <ScrollView
      style={[globalStyles.page, { flex: 1 }]}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
        flexGrow: 1,
      }}
    >
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
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ color: colors.text }}>Pas encore de compte ?</Text>

            <Link href="/register" asChild>
              <Text style={{ color: colors.primary, fontWeight: "600" }}>
                Créer un compte
              </Text>
            </Link>
          </View>
        }
      />
    </ScrollView>
  );
}
