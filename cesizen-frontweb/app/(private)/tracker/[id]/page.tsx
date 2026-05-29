"use client";

import { useParams } from "next/navigation";

import { useTracker } from "@/hooks/trackers/useTracker";
import { useRapports } from "@/hooks/rapports/useRapports";
import TrackerDetails from "@/components/Tracker/TrackerDetails/TrackerDetails";
import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import { useAuth } from "@/hooks/useAuth";

export default function TrackerPage() {
  const params = useParams();
  const id = params.id as string;
  const { isAuth } = useAuth();
  
  const {
    tracker,
    loading: loadingTracker,
    error: errorTracker,
  } = useTracker(id);
  const {
    rapports,
    loading: loadingRapport,
    error: errorRapport,
  } = useRapports();

  if (!isAuth) return <AccessDenied />;

  if (loadingTracker || loadingRapport) {
    return <p>Chargement...</p>;
  }

  if (errorTracker || errorRapport) {
    return <p>Erreur : {errorTracker || errorRapport}</p>;
  }

  if (!tracker) {
    return <p>Tracker introuvable</p>;
  }

  return (
    <div className="page">
      <TrackerDetails tracker={tracker} rapports={rapports} />
    </div>
  );
}
