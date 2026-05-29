"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCreateEmotion } from "@/hooks/emotions/useCreateEmotion";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";

export default function newEmotionPage() {
  const params = useParams();
  const id = params.id as string;
  const { createEmotion, loading, error } = useCreateEmotion();
  const router = useRouter();
  const { isAdmin } = useAuth();

  if (!isAdmin) return <AccessDenied />;

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await createEmotion({
      libelle: formData.libelle,
      description: formData.Description,
      emotionGenerale: `api/emotion_generales/${id}`,
    });

    if (res) {
      setTimeout(() => {
        router.push(`/emotion/${id}`);
      });
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {error && <FormMessage message={error} />}
      <div className="page">
        <Form
          titreForm="Créer une émotion"
          champs={["Libellé"]}
          names={["libelle"]}
          buttonText={loading ? "Création..." : "Création de l'émotion"}
          placeHolders={["Libellé"]}
          textAreas={["Description"]}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
