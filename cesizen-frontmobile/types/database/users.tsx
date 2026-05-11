import { Role } from "./roles";

export type User= {
  id_utilisateur: number;

  nom: string;
  
  prenom: string;

  telephone: string | null;

  statut_compte: "ACTIF" | "DESACTIVE" | "BLOQUE";

  date_creation: string;

  role: Role;
}