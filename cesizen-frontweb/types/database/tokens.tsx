import { User } from "./users";

export type Token = {
  idToken: number;

  token: string;

  dateExpiration: string;

  dateCreation: string;

  estRevoque: boolean;

  utilisateur: User;
};
