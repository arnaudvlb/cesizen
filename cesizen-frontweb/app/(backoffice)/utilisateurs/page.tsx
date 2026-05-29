"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import Filter from "@/components/ui/Filter/Filter";
import UtilisateursCard from "@/components/UtilisateursCard/UtilisateursCard";
import { useAuth } from "@/hooks/useAuth";
import { useUtilisateurs } from "@/hooks/utilisateurs/useUtilisateurs";
import { useState } from "react";

export default function UtilisateursPage() {
  const { utilisateurs, loading, error } = useUtilisateurs();
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const { isAdmin } = useAuth();

    const filteredUtilisateurs = utilisateurs.filter((utilisateur) => {
    const searchLower = search.toLowerCase();

    const matchNom = utilisateur.nom.toLowerCase().includes(searchLower);

    const matchRole = utilisateur.role.libelle
      .toLowerCase()
      .includes(searchLower);
      
    const matchMail = utilisateur.email.toLowerCase().includes(searchLower);

    if (filterBy === "nom") return matchNom;
    if (filterBy === "role") return matchRole;
    if (filterBy === "mail") return matchMail;

    return matchNom || matchRole || matchMail;
  });

  if (!isAdmin) return <AccessDenied />;

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Gestion des utilisateurs</h1>
      <Filter
        value={search}
        onChange={setSearch}
        filterBy={filterBy}
        onFilterByChange={setFilterBy}
        options={[
          { label: "Tout", value: "all" },
          { label: "Nom", value: "nom" },
          { label: "Rôle", value: "role" },
          { label: "Mail", value: "mail" },
        ]}
      />
      <UtilisateursCard users={filteredUtilisateurs} />
    </main>
  );
}
