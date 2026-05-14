import { Role } from "./roles";

export type User= {
  id: number;

  nom: string;
  
  prenom: string;

  telephone: string | null;

  statutCompte: "ACTIF" | "DESACTIVE" | "BLOQUE";

  dateCreation: string;

  role: Role;
}