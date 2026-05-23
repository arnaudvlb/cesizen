"use client";

import UtilisateursCard from "@/components/UtilisateursCard/UtilisateursCard";
import { useUtilisateurs } from "@/hooks/utilisateurs/useUtilisateurs";

export default function UtilisateursPage() {
  const { utilisateurs, loading, error } = useUtilisateurs();
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Gestion des utilisateurs</h1>
      <UtilisateursCard users={utilisateurs} />
    </main>
  );
}
