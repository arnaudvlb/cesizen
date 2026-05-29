"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCreateTracker } from "@/hooks/trackers/useCreateTracker";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function newTrackerPage() {
  const { createTracker, loading, error } = useCreateTracker();
  const router = useRouter();
  const { isAuth } = useAuth();

  if (!isAuth) return <AccessDenied />;

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await createTracker({
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
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
