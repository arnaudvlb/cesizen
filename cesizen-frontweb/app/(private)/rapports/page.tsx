"use client";

import RapportCard from "@/components/RapportsCard/RapportCard";
import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import CreateButton from "@/components/ui/CreateButton/CreateButton";
import { useRapports } from "@/hooks/rapports/useRapports";
import { useAuth } from "@/hooks/useAuth";

export default function RapportsPage() {
  const { rapports, loading, error } = useRapports();
  const { isAuth } = useAuth();

  if (!isAuth) return <AccessDenied />;

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return (
    <div className="page">
      <h1 className="pageTitle">Mes rapports</h1>
      <RapportCard rapports={rapports} />
      <CreateButton url="/rapport/new" />
    </div>
  );
}
