"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useEmotion } from "@/hooks/emotions/useEmotion";
import { usePatchEmotion } from "@/hooks/emotions/usePatchEmotion";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";

export default function editEmotionPage() {
  const params = useParams();
  const id = params.id as string;
  const { emotion } = useEmotion(id);
  const { patchEmotion, loading, error } = usePatchEmotion(id);
  const router = useRouter();
  const { isAdmin } = useAuth();

  if (!isAdmin) return <AccessDenied />;

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await patchEmotion({
      libelle: formData.libelle,
      description: formData.Description,
      emotionGenerale: `/api/emotion_generales/${emotion?.emotionGenerale.id}`,
    });

    if (res) {
      setTimeout(() => {
        router.push(`/emotion/${emotion?.emotionGenerale.id}`);
      });
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {error && <FormMessage message={error} />}
      <div className="page">
        <Form
          titreForm="Modifier l'émotion"
          champs={["Libellé"]}
          names={["libelle"]}
          buttonText={loading ? "Modification..." : "Modification de l'émotion"}
          placeHolders={["Libellé"]}
          textAreas={["Description"]}
          defaultValues={{
            libelle: emotion?.libelle ?? "",
            Description: emotion?.description ?? "",
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
