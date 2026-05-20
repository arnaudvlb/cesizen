import { User } from "./users";

export type Tracker = {
  id: number;

  dateDebut: string;

  dateFin: string;

  libelle: string;

  description: string;

  utilisateur: User;
};
