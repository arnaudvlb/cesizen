import { User } from "./users";

export type Token = {
  id_token: number;

  token: string;

  date_expiration: string;

  date_creation: string;

  est_revoque: boolean;

  utilisateur: User;
};
