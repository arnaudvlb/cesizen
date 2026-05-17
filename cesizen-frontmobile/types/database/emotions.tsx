import { EmotionGenerale } from "./emotionGenerales";

export type Emotion = {
  id: number;

  libelle: string;

  description: string;

  emotionGenerale: EmotionGenerale;
};
