"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCreateEmotionGenerale } from "@/hooks/emotionGenerales/useCreateEmotionGenerale";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function newEmotionGeneralePage() {
  const { createEmotionGenerale, loading, error } = useCreateEmotionGenerale();
  const router = useRouter();
  const { isAdmin } = useAuth();

  if (!isAdmin) return <AccessDenied />;

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await createEmotionGenerale({
      libelle: formData.libelle,
      description: formData.Description,
      couleur: formData.couleur,
    });

    if (res) {
      setTimeout(() => {
        router.push("/emotions");
      });
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {error && <FormMessage message={error} />}
      <div className="page">
        <Form
          titreForm="Créer une émotion générale"
          champs={["Libellé", "Couleur"]}
          names={["libelle", "couleur"]}
          buttonText={
            loading ? "Création..." : "Création de l'émotion générale"
          }
          placeHolders={["Libellé", "#FFFFFF"]}
          textAreas={["Description"]}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
