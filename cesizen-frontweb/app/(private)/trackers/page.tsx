"use client";

import CreateButton from "@/components/ui/CreateButton/CreateButton";
import { useTrackers } from "@/hooks/trackers/useTrackers";

export default function TrackersPage() {
  const { trackers, loading, error } = useTrackers();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return (
    <div className="page">
      <h1 className="pageTitle">Mes trackers</h1>
      <CreateButton url="/tracker/new" />
    </div>
  );
}
