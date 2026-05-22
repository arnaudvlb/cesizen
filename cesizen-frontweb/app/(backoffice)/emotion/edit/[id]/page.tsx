"use client";

import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useEmotionGenerale } from "@/hooks/emotionGenerales/useEmotionGenerale";
import { usePatchEmotionGenerale } from "@/hooks/emotionGenerales/usePatchEmotionGenerale";
import { useParams, useRouter } from "next/navigation";

export default function editTrackerPage() {
  const params = useParams();
  const id = params.id as string;
  const { emotionGenerale } = useEmotionGenerale(id);
  const { patchEmotionGenerale, loading, error } = usePatchEmotionGenerale(id);
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await patchEmotionGenerale({
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
          defaultValues={{
            libelle: emotionGenerale?.libelle ?? "",
            couleur: emotionGenerale?.couleur ?? "",
            Description: emotionGenerale?.description ?? "",
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
