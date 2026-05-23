import { Role } from "./roles";

export type User= {
  id: number;

  nom: string;
  
  prenom: string;

  email: string;

  password: string;

  dateCreation: string;

  role: Role;
}