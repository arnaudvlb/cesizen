"use client";

import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { usePatchTracker } from "@/hooks/trackers/usePatchTracker";
import { useTracker } from "@/hooks/trackers/useTracker";
import { useParams, useRouter } from "next/navigation";

export default function editTrackerPage() {
  const params = useParams();
  const id = params.id as string;
  const { tracker } = useTracker(id);
  const { patchTracker, loading, error } = usePatchTracker(id);
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await patchTracker({
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
      libelle: formData.libelle,
      description: formData.Description,
    });

    if (res) {
      setTimeout(() => {
        router.push("/trackers");
      });
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {error && <FormMessage message={error} />}
      <div className="page">
        <Form
          titreForm="Nouveau tracker"
          champs={["Date de début", "Date de fin", "Libellé"]}
          names={["dateDebut", "dateFin", "libelle"]}
          buttonText={loading ? "Création..." : "Créer le tracker"}
          placeHolders={["JJ/MM/YYYY", "JJ/MM/YYYY", "Libellé"]}
          textAreas={["Description"]}
          defaultValues={{
            dateDebut: new Date(tracker?.dateDebut || new Date()).toLocaleDateString("fr-FR"),
            dateFin: new Date(tracker?.dateFin || new Date()).toLocaleDateString("fr-FR"),
            libelle: tracker?.libelle ?? "",
            Description: tracker?.description ?? "",
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
