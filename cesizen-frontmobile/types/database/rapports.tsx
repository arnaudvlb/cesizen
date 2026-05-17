import { EmotionGenerale } from "./emotionGenerales";
import { User } from "./users";

export type Rapport = {
  id: number;

  reponses: string;

  commentaire: string;

  dateRapport: string;

  emotionGenerale: EmotionGenerale;

  utilisateur: User;
};
