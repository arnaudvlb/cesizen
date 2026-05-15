"use client";

import RapportCard from "@/components/RapportsCard/RapportCard";
import { useRapports } from "@/hooks/useRapports";

export default function RapportsPage() {
  const { rapports, loading, error } = useRapports();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return (
    <div className="page">
      <h1 className="pageTitle">Mes rapports</h1>
      <RapportCard rapports={rapports} />
    </div>
  );
}
