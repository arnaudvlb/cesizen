"use client"

import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCreateEmotionGenerale } from "@/hooks/emotionGenerales/useCreateEmotionGenerale";
import { useRouter } from "next/navigation";

export default function newEmotionPage() {
  const { createEmotionGenerale, loading, error } = useCreateEmotionGenerale();
  const router = useRouter();

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
          titreForm="Modifier l'émotion générale"
          champs={["Libellé", "Couleur"]}
          names={["libelle", "couleur"]}
          buttonText={loading ? "Mise à jour..." : "Mettre à jour l'émotion générale"}
          placeHolders={["Libellé", "#FFFFFF"]}
          textAreas={["Description"]}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
